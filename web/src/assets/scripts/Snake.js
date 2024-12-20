import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
    constructor(info, gamemap) {
        super();


        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r, info.c)]; //存放蛇的身体,cells[0]是蛇头
        this.next_cell = null; //蛇下一步要移动到的位置

        this.speed = 5;//蛇的速度,每秒移动的格子数

        this.direction = -1;//蛇的移动方向,0上,1右,2下,3左
        this.status = "idle";//蛇的状态,idle:空闲,move:移动,dead:死亡

        this.dr = [-1, 0, 1, 0]; //四个方向行的偏移量
        this.dc = [0, 1, 0, -1]; //四个方向列的偏移量

        this.step = 0; //当前回合数

        this.eps = 1e-2;

        this.eye_direction = 0; //蛇头的眼睛方向
        if(this.id ===1) this.eye_direction = 2; //如果是左下角的蛇,眼睛向下

        this.eye_dx = [
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
        ]; //蛇头的眼睛四个方向的行偏移量
        this.eye_dy = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1],
        ]; //蛇头的眼睛四个方向的列偏移量
        
    }

    start() {

    }

    set_direction(d) {
        this.direction = d;
    }

    check_tail_increasing() {  //检测当前回合蛇的长度是否增加
        if(this.step <= 10) return true;
        if(this.step % 3 === 1) return true;
        return false;
    }

    next_step() { //计算蛇下一步的位置
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.eye_direction = d;
        this.direction = -1; //重置方向
        this.status = "move"; //设置状态为移动
        this.step++; //回合数加1

        const k = this.cells.length;
        for(let i = k; i > 0; i -- ) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));

        }
    }       
    

    update_move() {
        
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.eps) { //到达目标位置
            this.cells[0] = this.next_cell; //添加一个新蛇头
            this.next_cell = null;
            this.status = "idle"; //走完了，停下来

            if(!this.check_tail_increasing()) {
                this.cells.pop(); //删除尾巴
            }
        } else {
            const move_distance = this.speed * this.timedelta / 1000; //每两帧之间走的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if(!this.check_tail_increasing()) {
                const k = this.cells.length;
                const tail = this.cells[k - 1], tail_target = this.cells[k - 2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance;
            }
        }

        

    }

    update() {  //更新蛇的位置(每一帧调用一次)
        if(this.status === "move") {
            this.update_move();
        }
        
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        if(this.status === "dead") {
            ctx.fillStyle = "#FFFFFF";
        }



        for(const cell of this.cells) {
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }

        for(let i = 1; i < this.cells.length; i ++ ) {
            const a = this.cells[i - 1], b = this.cells[i];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) 
                continue;
            if(Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.5 + 0.1) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
            } else {
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.5 + 0.1) * L, Math.abs(a.x - b.x) * L, L * 0.8);
            }
        }

        //渲染蛇头的眼睛
        ctx.fillStyle = "#000";
        for(let i = 0; i < 2; i ++ ) {
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.2) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.2) * L;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, L * 0.05, 0, Math.PI * 2);
            ctx.fill();
        }
    }

}

