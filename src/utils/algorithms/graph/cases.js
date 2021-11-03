export const canFinishCase1 = [3, [[1, 0], [2, 0], [1, 2]]];
let prerequisites = [];
for (let i = 0; i < 1e+5; i++) {
    let r1 = Math.floor(Math.random() * (1e+5 - 1));
    let r2 = Math.floor(Math.random() * (1e+5 - 1));
    prerequisites.push([r1, r2]);
}
export const canFinishCase3 = [1e+5, prerequisites];
export const networkDelayTimeCase3 = [[[1, 2, 1], [2, 3, 7], [1, 3, 4], [2, 1, 2]], 4, 1];
export const criticalConnectionsCase1 = [4, [[0, 1], [1, 2], [2, 0], [1, 3]]];
