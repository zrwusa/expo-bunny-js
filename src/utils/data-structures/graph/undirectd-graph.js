import { arrayRemove } from '../../utils';
import { AbstractEdge, AbstractGraph, AbstractVertex } from './abstract-graph';
export class UndirectedVertex extends AbstractVertex {
    constructor(id) {
        super(id);
    }
}
export class UndirectedEdge extends AbstractEdge {
    constructor(v1, v2, weight) {
        super(weight);
        this._vertices = [v1, v2];
    }
    get vertices() {
        return this._vertices;
    }
    set vertices(v) {
        this._vertices = v;
    }
}
export class UndirectedGraph extends AbstractGraph {
    constructor() {
        super();
        this._edges = new Map();
    }
    getEdge(v1, v2) {
        let edges = [];
        if (v1 !== null && v2 !== null) {
            const vertex1 = this.getVertex(v1);
            const vertex2 = this.getVertex(v2);
            if (vertex1 && vertex2) {
                edges = this._edges.get(vertex1)?.filter(e => e.vertices.includes(vertex2.id));
            }
        }
        return edges ? edges[0] || null : null;
    }
    addEdge(edge) {
        for (let end of edge.vertices) {
            const endVertex = this.getVertex(end);
            if (endVertex === null)
                return false;
            if (endVertex) {
                const edges = this._edges.get(endVertex);
                if (edges) {
                    edges.push(edge);
                }
                else {
                    this._edges.set(endVertex, [edge]);
                }
            }
        }
        return true;
    }
    removeEdgeBetween(v1, v2) {
        const vertex1 = this.getVertex(v1);
        const vertex2 = this.getVertex(v2);
        if (!vertex1 || !vertex2) {
            return null;
        }
        const v1Edges = this._edges.get(vertex1);
        let removed = null;
        if (v1Edges) {
            removed = arrayRemove(v1Edges, e => e.vertices.includes(vertex2.id))[0] || null;
        }
        const v2Edges = this._edges.get(vertex2);
        if (v2Edges) {
            arrayRemove(v2Edges, e => e.vertices.includes(vertex1.id));
        }
        return removed;
    }
    removeEdge(edge) {
        return this.removeEdgeBetween(edge.vertices[0], edge.vertices[1]);
    }
    degreeOf(vertexOrId) {
        const vertex = this.getVertex(vertexOrId);
        if (vertex) {
            return this._edges.get(vertex)?.length || 0;
        }
        else {
            return 0;
        }
    }
    edgesOf(vertexOrId) {
        const vertex = this.getVertex(vertexOrId);
        if (vertex) {
            return this._edges.get(vertex) || [];
        }
        else {
            return [];
        }
    }
    edgeSet() {
        const edgeSet = new Set();
        this._edges.forEach(edges => {
            edges.forEach(edge => {
                edgeSet.add(edge);
            });
        });
        return [...edgeSet];
    }
    getEdgesOf(vertexOrId) {
        const vertex = this.getVertex(vertexOrId);
        if (!vertex) {
            return [];
        }
        return this._edges.get(vertex) || [];
    }
    getNeighbors(vertexOrId) {
        const neighbors = [];
        const vertex = this.getVertex(vertexOrId);
        if (vertex) {
            const neighborEdges = this.getEdgesOf(vertex);
            for (let edge of neighborEdges) {
                const neighbor = this.getVertex(edge.vertices.filter(e => e !== vertex.id)[0]);
                neighbors.push(neighbor);
            }
        }
        return neighbors;
    }
    getEndsOfEdge(edge) {
        if (!this.containsEdge(edge.vertices[0], edge.vertices[1])) {
            return null;
        }
        const v1 = this.getVertex(edge.vertices[0]);
        const v2 = this.getVertex(edge.vertices[1]);
        if (v1 && v2) {
            return [v1, v2];
        }
        else {
            return null;
        }
    }
}
