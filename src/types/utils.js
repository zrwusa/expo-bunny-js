const arr = ['1', 2, 4, 5, 6];
const a = 2;
// export type TreeNode = {
//     id: string,
//     name?: string,
//     value?: number,
//     children?: TreeNode[]
// }
export class TreeNode {
    constructor(id, name, value, children) {
        // TODO get set
        // get name (): string | undefined {
        //     return this.name;
        // }
        //
        // set name (name: string | undefined) {
        //     this.name = name;
        // }
        this.addChildren = (children) => {
            if (!this.children) {
                this.children = [];
            }
            if (children instanceof Array) {
                this.children = this.children.concat(children);
            }
            else {
                this.children.push(children);
            }
        };
        this.getHeight = () => {
            const beginRoot = this;
            let maxDepth = 1;
            if (beginRoot) {
                const bfs = (node, level) => {
                    if (level > maxDepth) {
                        maxDepth = level;
                    }
                    const { children } = node;
                    if (children) {
                        for (let i = 0, len = children.length; i < len; i++) {
                            bfs(children[i], level + 1);
                        }
                    }
                };
                bfs(beginRoot, 1);
            }
            return maxDepth;
        };
        this.id = id;
        this.name = name || '';
        this.value = value || undefined;
        this.children = children || [];
    }
}
