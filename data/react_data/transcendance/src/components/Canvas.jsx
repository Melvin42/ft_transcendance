import React, { useRef, useEffect } from 'react'
import { user, com, net, ball } from '../datas/pongObj'

const Canvas = props => {
	const canvasRef = useRef(null)

	const drawRect = (ctx, x, y, w, h, color) => {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
		}

	const drawCircle = (ctx, x, y, radius, color) => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	}

	const drawText = (ctx, text, x, y, color) => {
		ctx.fillStyle = color;
		ctx.font = "75px fantasy";
		ctx.fillText(text, x, y);
	}

	const drawNet = (ctx, net) => {
		for (let i = 0; i <= ctx.canvas.height; i += 15) {
			drawRect(ctx, net.x, net.y + i, net.width, net.height, net.color);
		}
	}

	const collision = (ball, paddle) => {
		paddle.top = paddle.y;
		paddle.bottom = paddle.y + paddle.height;
		paddle.left = paddle.x;
		paddle.right = paddle.x + paddle.width;

		ball.top = ball.y - ball.radius;
		ball.bottom = ball.y + ball.radius;
		ball.left = ball.x - ball.radius;
		ball.right = ball.x + ball.radius;

		return (ball.right > paddle.left
			&& ball.top < paddle.bottom
			&& ball.left < paddle.right
			&& ball.bottom > paddle.top);
	}

	const resetBall = (ctx, ball) => {
		ball.x = ctx.canvas.width / 2;
		ball.y = ctx.canvas.height / 2;

		ball.speed = 5;
		drawText(ctx, com.score, (3 * ctx.canvas.width / 4), (ctx.canvas.height / 5), "WHITE");
		ball.velocityX = -(ball.velocityX);
}

	const update = (ctx, user, com, ball) => {
		let computerLevel = 0.1;

		com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;

		ball.x += ball.velocityX;
		ball.y += ball.velocityY;

		if (ball.y + ball.radius > ctx.canvas.height
			|| ball.y - ball.radius < 0) {
			ball.velocityY = -(ball.velocityY);
		}
		let player = (ball.x < (ctx.canvas.width / 2)) ? user : com;

		if (collision(ball, player)) {
			let collidePoint = (ball.y - (player.y + player.height / 2));

			collidePoint = collidePoint / (player.height / 2);

			let angleRad = (Math.PI / 4) * collidePoint;
			let direction = (ball.x < ctx.canvas.width / 2) ? 1 : -1;

			ball.velocityX = direction * ball.speed * Math.cos(angleRad);
			ball.velocityY = ball.speed * Math.sin(angleRad);

			ball.speed += 0.1;
		}
		//
		//update score
		if (ball.x - ball.radius < 0) {
			com.score++;
			resetBall(ctx, ball);
		} else if (ball.x + ball.radius > ctx.canvas.width) {
			user.score++;
			resetBall(ctx, ball);
		}
	}

	const render = ctx => {
		drawRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, "black");
		drawNet(ctx, net);
		drawText(ctx, user.score, (ctx.canvas.width / 4), (ctx.canvas.height / 5), "WHITE");
		drawText(ctx, com.score, (3 * ctx.canvas.width / 4), (ctx.canvas.height / 5), "WHITE");
		drawRect(ctx, user.x, user.y, user.width, user.height, user.color);
		drawRect(ctx, com.x, com.y, com.width, com.height, com.color);
		drawCircle(ctx, ball.x, ball.y, ball.radius, ball.color);
	}

	const game = (ctx, user, com, ball) => {
		update(ctx, user, com, ball)
		render(ctx)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		ctx.canvas.addEventListener("mousemove", (evt) => {
			let rect = ctx.canvas.getBoundingClientRect();

			user.y = evt.clientY - rect.top - user.height / 2;
		});

		const interval = setInterval(() => {
			game(ctx, user, com, ball)
		}, (1000 / 60))

		return () => clearInterval(interval);

	}, [])
	return <canvas ref={canvasRef} {...props}/>
}

	/*
canvas.addEventListener("mousemove", modePaddle);

function modePaddle(evt) {
	let rect = canvas.getBoundingClientRect();

	user.y = evt.clientY - rect.top - user.height / 2;
}

function collision(ball, paddle) {
	paddle.top = paddle.y;
	paddle.bottom = paddle.y + paddle.height;
	paddle.left = paddle.x;
	paddle.right = paddle.x + paddle.width;

	ball.top = ball.y - ball.radius;
	ball.bottom = ball.y + ball.radius;
	ball.left = ball.x - ball.radius;
	ball.right = ball.x + ball.radius;

	return (ball.right > paddle.left
		&& ball.top < paddle.bottom
		&& ball.left < paddle.right
		&& ball.bottom > paddle.top);
}

function resetBall() {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;

	ball.speed = 5;
			drawText(com.score, (3 * ctx.canvas.width / 4), (ctx.canvas.height / 5), "WHITE");
	ball.velocityX = -(ball.velocityX);
}

function game() {
	update();
	render();
}

const framePerSecond = 50;

setInterval(game, (1000 / framePerSecond));
*/

export default Canvas
