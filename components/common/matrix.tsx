import React, { useRef, useEffect } from 'react';

const charArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "А",
    "В",
    "Г",
    "Д",
    "Є",
    "Ѕ",
    "З",
    "И",
    "Ѳ",
    "І",
    "К",
    "Л",
    "М",
    "Н",
    "Ѯ",
    "Ѻ",
    "П",
    "Ч",
    "Р",
    "С",
    "Т",
    "Ѵ",
    "Ф",
    "Х",
    "Ѱ",
    "Ѿ",
    "Ц",
];

class FallingChar {
    x: any; y: any; speed: any; value: any;
    constructor(x: any, y: any) {
        this.x = x;
        this.y = y;
    }

    draw(ctx: any, fontSize: any, ch: any, maxColumns: any) {
        this.value =
            charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        ctx.fillStyle = "rgba(0,255,0)";
        ctx.font = fontSize + "px sans-serif";
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
            this.y = (Math.random() * ch) / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

const Matrix = () => {
    const maxCharCount = useRef(300);
    const fallingCharArr = useRef<any>([]);
    const fontSize = 13;
    const maxColumns = useRef(0);
    const frames = useRef(0);
    const ctx = useRef<any>(null);
    const canvas = useRef<any>(null);
    const cw = useRef(500)
    const ch = useRef(500)

    useEffect(() => {
        const _canvas = document.querySelector<HTMLCanvasElement>("#canvas");
        // const widthMain = document.querySelector<HTMLElement>('.main_page')?.clientWidth;
        if (_canvas) {
            canvas.current = _canvas;
            ctx.current = canvas.current.getContext("2d");
            cw.current = window.innerWidth;
            ch.current = window.innerHeight
            canvas.current.width = cw.current;
            canvas.current.height = ch.current;
        }
        resize();
        update();
        window.addEventListener('resize', resize, true);
        return () => {
            window.removeEventListener('resize', resize, true);
        }
        /* eslint-disable */
    }, [])


    const resize = () => {
        canvas.current.width = cw.current
        canvas.current.height = ch.current;
        maxColumns.current = cw.current / fontSize;
        frames.current = 0;
    }

    const update = () => {
        if (fallingCharArr.current.length < maxCharCount.current) {
            let fallingChar = new FallingChar(
                Math.floor(Math.random() * maxColumns.current) * fontSize,
                (Math.random() * ch.current) / 2 - 50
            );
            fallingCharArr.current.push(fallingChar);
        }
        ctx.current.fillStyle = "rgba(0,0,0,0.05)";
        ctx.current.fillRect(0, 0, cw.current, ch.current);
        for (let i = 0; i < fallingCharArr.current.length && frames.current % 2 == 0; i++) {
            fallingCharArr.current[i].draw(ctx.current, fontSize, ch.current, maxColumns.current);
        }

        requestAnimationFrame(update);
        frames.current++;
    };
    return (
        <canvas width="100%" height="100%" id="canvas" style={{ width: '100%' }}> </canvas>
    );
};

export default Matrix;