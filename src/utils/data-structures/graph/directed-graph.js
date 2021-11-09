import { arrayRemove } from '../../utils';
import { AbstractEdge, AbstractGraph, AbstractVertex } from './abstract-graph';
export class DirectedVertex extends AbstractVertex {
    constructor(id) {
        super(id);
    }
}
export class DirectedEdge extends AbstractEdge {
    constructor(src, dest, weight) {
        super(weight);
        this._src = src;
        this._dest = dest;
    }
    get src() {
        return this._src;
    }
    set src(v) {
        this._src = v;
    }
    get dest() {
        return this._dest;
    }
    set dest(v) {
        this._dest = v;
    }
}
// Strongly connected, One direction connected, Weakly connected
export class DirectedGraph extends AbstractGraph {
    constructor() {
        super();
        this._outEdgeMap = new Map();
        this._inEdgeMap = new Map();
    }
    getEdge(srcOrId, destOrId) {
        let edges = [];
        if (srcOrId !== null && destOrId !== null) {
            const src = this.getVertex(srcOrId);
            const dest = this.getVertex(destOrId);
            if (src && dest) {
                const srcOutEdges = this._outEdgeMap.get(src);
                if (srcOutEdges) {
                    edges = srcOutEdges.filter(edge => edge.dest === dest.id);
                }
            }
        }
        return edges[0] || null;
    }
    addEdge(edge) {
        if (!(this.containsVertex(edge.src) && this.containsVertex(edge.dest))) {
            return false;
        }
        const srcVertex = this.getVertex(edge.src);
        const srcOutEdges = this._outEdgeMap.get(srcVertex);
        if (srcOutEdges) {
            srcOutEdges.push(edge);
        }
        else {
            this._outEdgeMap.set(srcVertex, [edge]);
        }
        const destVertex = this.getVertex(edge.dest);
        const destInEdges = this._inEdgeMap.get(destVertex);
        if (destInEdges) {
            destInEdges.push(edge);
        }
        else {
            this._inEdgeMap.set(destVertex, [edge]);
        }
        return true;
    }
    removeEdgeBetween(srcOrId, destOrId) {
        const src = this.getVertex(srcOrId);
        const dest = this.getVertex(destOrId);
        let removed = null;
        if (!src || !dest) {
            return null;
        }
        const srcOutEdges = this._outEdgeMap.get(src);
        if (srcOutEdges) {
            arrayRemove(srcOutEdges, edge => edge.dest === dest.id);
        }
        const destInEdges = this._inEdgeMap.get(dest);
        if (destInEdges) {
            removed = arrayRemove(destInEdges, edge => edge.src === src.id)[0] || null;
        }
        return removed;
    }
    removeEdge(edge) {
        let removed = null;
        const src = this.getVertex(edge.src);
        const dest = this.getVertex(edge.dest);
        if (src && dest) {
            const srcOutEdges = this._outEdgeMap.get(src);
            if (srcOutEdges && srcOutEdges.length > 0) {
                arrayRemove(srcOutEdges, edge => edge.src === src.id);
            }
            const destInEdges = this._inEdgeMap.get(dest);
            if (destInEdges && destInEdges.length > 0) {
                removed = arrayRemove(destInEdges, edge => edge.dest === dest.id)[0];
            }
        }
        return removed;
    }
    removeAllEdges(src, dest) {
        return [];
    }
    incomingEdgesOf(vertexOrId) {
        const target = this.getVertex(vertexOrId);
        if (target) {
            return this._inEdgeMap.get(target) || [];
        }
        return [];
    }
    outgoingEdgesOf(vertexOrId) {
        const target = this.getVertex(vertexOrId);
        if (target) {
            return this._outEdgeMap.get(target) || [];
        }
        return [];
    }
    degreeOf(vertexOrId) {
        return this.outDegreeOf(vertexOrId) + this.inDegreeOf(vertexOrId);
    }
    inDegreeOf(vertexOrId) {
        return this.incomingEdgesOf(vertexOrId).length;
    }
    outDegreeOf(vertexOrId) {
        return this.outgoingEdgesOf(vertexOrId).length;
    }
    edgesOf(vertexOrId) {
        return [...this.outgoingEdgesOf(vertexOrId), ...this.incomingEdgesOf(vertexOrId)];
    }
    getEdgeSrc(e) {
        return this.getVertex(e.src);
    }
    getEdgeDest(e) {
        return this.getVertex(e.dest);
    }
    getDestinations(vertex) {
        if (vertex === null) {
            return [];
        }
        const destinations = [];
        const outgoingEdges = this.outgoingEdgesOf(vertex);
        for (let outEdge of outgoingEdges) {
            const child = this.getEdgeDest(outEdge);
            if (child) {
                destinations.push(child);
            }
        }
        return destinations;
    }
    /**--- start find cycles --- */
    /**
     * when stored with adjacency list time: O(V+E)
     * when stored with adjacency matrix time: O(V^2)
     */
    topologicalSort() {
        // vector<vector<int>> g;
        // vector<int> color;
        // int last;
        // bool hasCycle;
        //
        // bool topo_sort() {
        //     int n = g.size();
        //     vector<int> degree(n, 0);
        //     queue<int> q;
        //     for (int i = 0; i < n; i++) {
        //         degree[i] = g[i].size();
        //         if (degree[i] <= 1) {
        //             q.push(i);
        //         }
        //     }
        //     int cnt = 0;
        //     while (!q.empty()) {
        //         cnt++;
        //         int root = q.front();
        //         q.pop();
        //         for (auto child : g[root]) {
        //             degree[child]--;
        //             if (degree[child] == 1) {
        //                 q.push(child);
        //             }
        //         }
        //     }
        //     return (cnt != n);
        // }
        // When judging whether there is a cycle in the undirected graph, all nodes with degree of **<= 1** are enqueued
        // When judging whether there is a cycle in the directed graph, all nodes with **in degree = 0** are enqueued
        const statusMap = new Map();
        for (let entry of this._vertices) {
            statusMap.set(entry[1], 0);
        }
        const sorted = [];
        let hasCycle = false;
        const dfs = (cur) => {
            statusMap.set(cur, 1);
            const children = this.getDestinations(cur);
            for (let child of children) {
                const childStatus = statusMap.get(child);
                if (childStatus === 0) {
                    dfs(child);
                }
                else if (childStatus === 1) {
                    hasCycle = true;
                }
            }
            statusMap.set(cur, 2);
            sorted.push(cur);
        };
        for (let entry of this._vertices) {
            if (statusMap.get(entry[1]) === 0) {
                dfs(entry[1]);
            }
        }
        if (hasCycle) {
            return null;
        }
        return sorted.reverse();
    }
    /**--- end find cycles --- */
    edgeSet() {
        let edges = [];
        this._outEdgeMap.forEach(outEdges => {
            edges = [...edges, ...outEdges];
        });
        return edges;
    }
    getNeighbors(vertexOrId) {
        const neighbors = [];
        const vertex = this.getVertex(vertexOrId);
        if (vertex) {
            const outEdges = this.outgoingEdgesOf(vertex);
            for (let outEdge of outEdges) {
                const neighbor = this.getVertex(outEdge.dest);
                neighbors.push(neighbor);
            }
        }
        return neighbors;
    }
    getEndsOfEdge(edge) {
        if (!this.containsEdge(edge.src, edge.dest)) {
            return null;
        }
        const v1 = this.getVertex(edge.src);
        const v2 = this.getVertex(edge.dest);
        if (v1 && v2) {
            return [v1, v2];
        }
        else {
            return null;
        }
    }
}
