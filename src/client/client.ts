
import * as quick from 'quickio';

let game = new quick.Game();

let canvas = document.querySelector('canvas');
let ctx = canvas?.getContext('2d');

let player = game.addEntity();

let transform = <quick.Transform2d>player.addComponent(quick.Transform2d);
transform.position.xy = [ 300, 200 ];

let renderer2d = <quick.Renderer2d>player.addComponent(quick.Renderer2d);
renderer2d.addRenderRule((ctx) =>
{
    ctx.fillStyle = '000000';
    ctx.fillRect(transform.position.x, transform.position.y, 20, 20);
});

requestAnimationFrame(() =>
{
    game.update();

    if (ctx)
    {
        game.render(ctx);
    }
});