import { arrayRemove, uuidV4 } from '../../utils';
import { HeapNode, MinHeap } from '../heap';
export class AbstractVertex {
    constructor(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }
}
export class AbstractEdge {
    constructor(weight) {
        if (weight === undefined)
            weight = AbstractEdge.DEFAULT_EDGE_WEIGHT;
        this._weight = weight;
        this._hashCode = uuidV4();
    }
    get weight() {
        return this._weight;
    }
    set weight(v) {
        this._weight = v;
    }
    get hashCode() {
        return this._hashCode;
    }
    set hashCode(v) {
        this._hashCode = v;
    }
}
AbstractEdge.DEFAULT_EDGE_WEIGHT = 1;
// Connected Component === Largest Connected Sub-Graph
export class AbstractGraph {
    constructor() {
        this._vertices = new Map();
    }
    getVertex(vertexOrId) {
        const vertexId = this.getVertexId(vertexOrId);
        return this._vertices.get(vertexId) || null;
    }
    getVertexId(vertexOrId) {
        return vertexOrId instanceof AbstractVertex ? vertexOrId.id : vertexOrId;
    }
    containsVertex(vertexOrId) {
        return this._vertices.has(this.getVertexId(vertexOrId));
    }
    vertexSet() {
        return this._vertices;
    }
    addVertex(newVertex) {
        if (this.containsVertex(newVertex)) {
            return false;
        }
        this._vertices.set(newVertex.id, newVertex);
        return true;
    }
    removeVertex(vertexOrId) {
        const vertexId = this.getVertexId(vertexOrId);
        return this._vertices.delete(vertexId);
    }
    removeAllVertices(vertices) {
        let removed = [];
        for (let v of vertices) {
            removed.push(this.removeVertex(v));
        }
        return removed.length > 0;
    }
    containsEdge(v1, v2) {
        const edge = this.getEdge(v1, v2);
        return !!edge;
    }
    setEdgeWeight(srcOrId, destOrId, weight) {
        const edge = this.getEdge(srcOrId, destOrId);
        if (edge) {
            edge.weight = weight;
            return true;
        }
        else {
            return false;
        }
    }
    getAllPathsBetween(v1, v2) {
        let paths = [];
        const vertex1 = this.getVertex(v1);
        const vertex2 = this.getVertex(v2);
        if (!(vertex1 && vertex2)) {
            return [];
        }
        const dfs = (cur, dest, visiting, path) => {
            visiting.set(cur, true);
            if (cur === dest) {
                paths.push([vertex1, ...path]);
            }
            const neighbors = this.getNeighbors(cur);
            for (let neighbor of neighbors) {
                if (!visiting.get(neighbor)) {
                    path.push(neighbor);
                    dfs(neighbor, dest, visiting, path);
                    arrayRemove(path, vertex => vertex === neighbor);
                }
            }
            visiting.set(cur, false);
        };
        dfs(vertex1, vertex2, new Map(), []);
        return paths;
    }
    getPathSumWeight(path) {
        let sum = 0;
        for (let i = 0; i < path.length; i++) {
            sum += this.getEdge(path[i], path[i + 1])?.weight || 0;
        }
        return sum;
    }
    getMinCostBetween(v1, v2, isWeight) {
        if (isWeight === undefined)
            isWeight = false;
        if (isWeight) {
            const allPaths = this.getAllPathsBetween(v1, v2);
            let min = Infinity;
            for (let path of allPaths) {
                min = Math.min(this.getPathSumWeight(path), min);
            }
            return min;
        }
        else {
            // BFS
            const vertex2 = this.getVertex(v2);
            const vertex1 = this.getVertex(v1);
            if (!(vertex1 && vertex2)) {
                return null;
            }
            const visited = new Map();
            const queue = [vertex1];
            visited.set(vertex1, true);
            let cost = 0;
            while (queue.length > 0) {
                for (let i = 0; i < queue.length; i++) {
                    const cur = queue.shift();
                    if (cur === vertex2) {
                        return cost;
                    }
                    // TODO consider optimizing to AbstractGraph
                    const neighbors = this.getNeighbors(cur);
                    for (let neighbor of neighbors) {
                        if (!visited.has(neighbor)) {
                            visited.set(neighbor, true);
                            queue.push(neighbor);
                        }
                    }
                }
                cost++;
            }
            return null;
        }
    }
    getMinPathBetween(v1, v2, isWeight) {
        if (isWeight === undefined)
            isWeight = false;
        if (isWeight) {
            const allPaths = this.getAllPathsBetween(v1, v2);
            let min = Infinity;
            let minIndex = -1;
            let index = 0;
            for (let path of allPaths) {
                const pathSumWeight = this.getPathSumWeight(path);
                if (pathSumWeight < min) {
                    min = pathSumWeight;
                    minIndex = index;
                }
                index++;
            }
            return allPaths[minIndex] || null;
        }
        else {
            // BFS
            let minPath = [];
            const vertex1 = this.getVertex(v1);
            const vertex2 = this.getVertex(v2);
            if (!(vertex1 && vertex2)) {
                return [];
            }
            const dfs = (cur, dest, visiting, path) => {
                visiting.set(cur, true);
                if (cur === dest) {
                    minPath = [vertex1, ...path];
                    return;
                }
                const neighbors = this.getNeighbors(cur);
                for (let neighbor of neighbors) {
                    if (!visiting.get(neighbor)) {
                        path.push(neighbor);
                        dfs(neighbor, dest, visiting, path);
                        arrayRemove(path, vertex => vertex === neighbor);
                    }
                }
                visiting.set(cur, false);
            };
            dfs(vertex1, vertex2, new Map(), []);
            return minPath;
        }
    }
    /**
     * Dijkstra algorithm time: O(VE) space: O(V + E)
     * @param src
     * @param dest
     * @param getMinDist
     * @param genPaths
     */
    dijkstraWithoutHeap(src, dest, getMinDist, genPaths) {
        if (getMinDist === undefined)
            getMinDist = false;
        if (genPaths === undefined)
            genPaths = false;
        if (dest === undefined)
            dest = null;
        let minDist = Infinity;
        let minDest = null;
        let minPath = [];
        const paths = [];
        const vertices = this._vertices;
        const distMap = new Map();
        const seen = new Set();
        const preMap = new Map(); // predecessor
        const srcVertex = this.getVertex(src);
        const destVertex = dest ? this.getVertex(dest) : null;
        if (!srcVertex) {
            return null;
        }
        for (let [id, v] of vertices) {
            distMap.set(v, Infinity);
        }
        distMap.set(srcVertex, 0);
        preMap.set(srcVertex, null);
        const getMinOfNoSeen = () => {
            let min = Infinity;
            let minV = null;
            for (let [key, val] of distMap) {
                if (!seen.has(key)) {
                    if (val < min) {
                        min = val;
                        minV = key;
                    }
                }
            }
            return minV;
        };
        const getPaths = (minV) => {
            for (let [id, v] of vertices) {
                const path = [v];
                let parent = preMap.get(v);
                while (parent) {
                    path.push(parent);
                    parent = preMap.get(parent);
                }
                const reversed = path.reverse();
                if (v === minV)
                    minPath = reversed;
                paths.push(reversed);
            }
        };
        for (let i = 1; i < vertices.size; i++) {
            const cur = getMinOfNoSeen();
            if (cur) {
                seen.add(cur);
                if (destVertex && destVertex === cur) {
                    if (getMinDist) {
                        minDist = distMap.get(destVertex) || Infinity;
                    }
                    if (genPaths) {
                        getPaths(destVertex);
                    }
                    return { distMap, preMap, seen, paths, minDist, minPath };
                }
                const neighbors = this.getNeighbors(cur);
                for (let neighbor of neighbors) {
                    if (!seen.has(neighbor)) {
                        const edge = this.getEdge(cur, neighbor);
                        if (edge) {
                            if (edge.weight + distMap.get(cur) < distMap.get(neighbor)) {
                                distMap.set(neighbor, edge.weight + distMap.get(cur));
                                preMap.set(neighbor, cur);
                            }
                        }
                    }
                }
            }
        }
        getMinDist && distMap.forEach((d, v) => {
            if (v !== srcVertex) {
                if (d < minDist) {
                    minDist = d;
                    if (genPaths)
                        minDest = v;
                }
            }
        });
        genPaths && getPaths(minDest);
        return { distMap, preMap, seen, paths, minDist, minPath };
    }
    /**
     * Dijkstra algorithm time: O(logVE) space: O(V + E)
     * @param src
     * @param dest
     * @param getMinDist
     * @param genPaths
     */
    dijkstra(src, dest, getMinDist, genPaths) {
        if (getMinDist === undefined)
            getMinDist = false;
        if (genPaths === undefined)
            genPaths = false;
        if (dest === undefined)
            dest = null;
        let minDist = Infinity;
        let minDest = null;
        let minPath = [];
        const paths = [];
        const vertices = this._vertices;
        const distMap = new Map();
        const seen = new Set();
        const preMap = new Map(); // predecessor
        const srcVertex = this.getVertex(src);
        const destVertex = dest ? this.getVertex(dest) : null;
        if (!srcVertex) {
            return null;
        }
        for (let [id, v] of vertices) {
            distMap.set(v, Infinity);
        }
        const heap = new MinHeap();
        heap.insert(new HeapNode(0, srcVertex));
        distMap.set(srcVertex, 0);
        preMap.set(srcVertex, null);
        const getPaths = (minV) => {
            for (let [id, v] of vertices) {
                const path = [v];
                let parent = preMap.get(v);
                while (parent) {
                    path.push(parent);
                    parent = preMap.get(parent);
                }
                const reversed = path.reverse();
                if (v === minV)
                    minPath = reversed;
                paths.push(reversed);
            }
        };
        while (heap.size() > 0) {
            const curHeapNode = heap.poll();
            const dist = curHeapNode?.id;
            const cur = curHeapNode?.val;
            if (dist !== undefined && typeof dist === 'number') {
                if (cur) {
                    seen.add(cur);
                    if (destVertex && destVertex === cur) {
                        if (getMinDist) {
                            minDist = distMap.get(destVertex) || Infinity;
                        }
                        if (genPaths) {
                            getPaths(destVertex);
                        }
                        return { distMap, preMap, seen, paths, minDist, minPath };
                    }
                    const neighbors = this.getNeighbors(cur);
                    for (let neighbor of neighbors) {
                        if (!seen.has(neighbor)) {
                            const weight = this.getEdge(cur, neighbor)?.weight;
                            if (typeof weight === 'number') {
                                const distSrcToNeighbor = distMap.get(neighbor);
                                if (distSrcToNeighbor) {
                                    if (dist + weight < distSrcToNeighbor) {
                                        heap.insert(new HeapNode(dist + weight, neighbor));
                                        preMap.set(neighbor, cur);
                                        distMap.set(neighbor, dist + weight);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (getMinDist) {
            distMap.forEach((d, v) => {
                if (v !== srcVertex) {
                    if (d < minDist) {
                        minDist = d;
                        if (genPaths)
                            minDest = v;
                    }
                }
            });
        }
        if (genPaths) {
            getPaths(minDest);
        }
        return { distMap, preMap, seen, paths, minDist, minPath };
    }
    /**
     * BellmanFord time:O(VE) space:O(V)
     * one to rest pairs
     * @param src
     * @param scanNegativeCycle
     * @param getMin
     * @param genPath
     */
    bellmanFord(src, scanNegativeCycle, getMin, genPath) {
        if (getMin === undefined)
            getMin = false;
        if (genPath === undefined)
            genPath = false;
        const srcVertex = this.getVertex(src);
        const paths = [];
        const distMap = new Map();
        const preMap = new Map(); // predecessor
        let min = Infinity;
        let minPath = [];
        // TODO
        let hasNegativeCycle = undefined;
        if (scanNegativeCycle)
            hasNegativeCycle = false;
        if (!srcVertex)
            return { hasNegativeCycle, distMap, preMap, paths, min, minPath };
        const vertices = this._vertices;
        const numOfVertices = vertices.size;
        const edges = this.edgeSet();
        const numOfEdges = edges.length;
        this._vertices.forEach(vertex => {
            distMap.set(vertex, Infinity);
        });
        distMap.set(srcVertex, 0);
        for (let i = 1; i < numOfVertices; ++i) {
            for (let j = 0; j < numOfEdges; ++j) {
                const ends = this.getEndsOfEdge(edges[j]);
                if (ends) {
                    const [s, d] = ends;
                    const weight = edges[j].weight;
                    const sWeight = distMap.get(s);
                    const dWeight = distMap.get(d);
                    if (sWeight !== undefined && dWeight !== undefined) {
                        if (distMap.get(s) !== Infinity && sWeight + weight < dWeight) {
                            distMap.set(d, sWeight + weight);
                            genPath && preMap.set(d, s);
                        }
                    }
                }
            }
        }
        let minDest = null;
        if (getMin) {
            distMap.forEach((d, v) => {
                if (v !== srcVertex) {
                    if (d < min) {
                        min = d;
                        if (genPath)
                            minDest = v;
                    }
                }
            });
        }
        if (genPath) {
            for (let [id, v] of vertices) {
                const path = [v];
                let parent = preMap.get(v);
                while (parent !== undefined) {
                    path.push(parent);
                    parent = preMap.get(parent);
                }
                const reversed = path.reverse();
                if (v === minDest)
                    minPath = reversed;
                paths.push(reversed);
            }
        }
        for (let j = 0; j < numOfEdges; ++j) {
            const ends = this.getEndsOfEdge(edges[j]);
            if (ends) {
                const [s] = ends;
                let weight = edges[j].weight;
                const sWeight = distMap.get(s);
                if (sWeight) {
                    if (sWeight !== Infinity && sWeight + weight < sWeight)
                        hasNegativeCycle = true;
                }
            }
        }
        return { hasNegativeCycle, distMap, preMap, paths, min, minPath };
    }
    /**
     * Floyd algorithm time: O(V^3) space: O(V^2), not support graph with negative weight cycle
     * all pairs
     */
    floyd() {
        const idAndVertices = [...this._vertices];
        const n = idAndVertices.length;
        let costs = [];
        let predecessor = [];
        // successors
        for (let i = 0; i < n; i++) {
            costs[i] = [];
            predecessor[i] = [];
            for (let j = 0; j < n; j++) {
                predecessor[i][j] = null;
            }
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                costs[i][j] = this.getEdge(idAndVertices[i][1], idAndVertices[j][1])?.weight || Infinity;
            }
        }
        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (costs[i][j] > costs[i][k] + costs[k][j]) {
                        costs[i][j] = costs[i][k] + costs[k][j];
                        predecessor[i][j] = idAndVertices[k][1];
                    }
                }
            }
        }
        return { costs, predecessor };
    }
    /**--- start find cycles --- */
    /**
     * Tarjan is an algorithm based on DFS,which is used to solve the connectivity problem of graphs.
     * Tarjan can find cycles in directed or undirected graph
     * Tarjan can find the articulation points and bridges(critical edges) of undirected graphs in linear time,
     * Tarjan solve the bi-connected components of undirected graphs;
     * Tarjan can find the SSC(strongly connected components), articulation points, and bridges of directed graphs.
     */
    tarjan(needArticulationPoints, needBridges, needSCCs, needCycles) {
        // !! in undirected graph we will not let child visit parent when DFS
        // !! articulation point(in DFS search tree not in graph): (cur !== root && cur.has(child)) && (low(child) >= dfn(cur)) || (cur === root && cur.children() >= 2)
        // !! bridge: low(child) > dfn(cur)
        const defaultConfig = false;
        if (needArticulationPoints === undefined)
            needArticulationPoints = defaultConfig;
        if (needBridges === undefined)
            needBridges = defaultConfig;
        if (needSCCs === undefined)
            needSCCs = defaultConfig;
        if (needCycles === undefined)
            needCycles = defaultConfig;
        const dfnMap = new Map();
        const lowMap = new Map();
        const vertices = this._vertices;
        vertices.forEach(v => {
            dfnMap.set(v, -1);
            lowMap.set(v, Infinity);
        });
        const [root] = vertices.values();
        const articulationPoints = [];
        const bridges = [];
        let dfn = 0;
        const dfs = (cur, parent) => {
            dfn++;
            dfnMap.set(cur, dfn);
            lowMap.set(cur, dfn);
            const neighbors = this.getNeighbors(cur);
            let childCount = 0; // child in DFS tree not child in graph
            for (let neighbor of neighbors) {
                if (neighbor !== parent) {
                    if (dfnMap.get(neighbor) === -1) {
                        childCount++;
                        dfs(neighbor, cur);
                    }
                    const childLow = lowMap.get(neighbor);
                    const curLow = lowMap.get(cur);
                    lowMap.set(cur, Math.min(curLow, childLow));
                    if (needArticulationPoints) {
                        if (cur === root && childCount >= 2 || ((cur !== root) && (childLow >= dfnMap.get(cur)))) {
                            articulationPoints.push(cur);
                        }
                    }
                    if (needBridges) {
                        if (childLow > dfnMap.get(cur)) {
                            bridges.push(this.getEdge(cur, neighbor));
                        }
                    }
                }
            }
        };
        dfs(root, null);
        let SCCs = new Map();
        const getSCCs = () => {
            const SCCs = new Map();
            lowMap.forEach((low, vertex) => {
                if (!SCCs.has(low)) {
                    SCCs.set(low, [vertex]);
                }
                else {
                    SCCs.get(low)?.push(vertex);
                }
            });
            return SCCs;
        };
        if (needSCCs) {
            SCCs = getSCCs();
        }
        const cycles = new Map();
        if (needCycles) {
            let SCCs = new Map();
            if (SCCs.size < 1) {
                SCCs = getSCCs();
            }
            SCCs.forEach((SCC, low) => {
                if (SCC.length > 1) {
                    cycles.set(low, SCC);
                }
            });
        }
        return { dfnMap, lowMap, bridges, articulationPoints, SCCs, cycles };
    }
    unionFind() {
    }
}
