import * as quick from 'quickio';

let game = new quick.Game();

let canvas = document.querySelector('canvas');
let ctx = canvas?.getContext('2d');

let player = game.addEntity();

class PlayerStuff extends quick.Component
{
    private transform!: quick.Transform2d;
    private input!: quick.InputChannel;

    start()
    {
        this.transform = this.entity.getComponent(quick.Transform2d);
        this.transform.position.xy = [ 300, 400 ];
        
        let renderer = this.entity.getComponent(quick.Renderer2d);
        renderer.addRenderStep((ctx) =>
        {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 600, 600);
            
            ctx.fillStyle = '#000000';
            ctx.fillRect(this.transform.position.x, this.transform.position.y, 20, 20);
        });

        this.input = this.game.createInputChannel();
    }

    update()
    {
        let xAxis = this.input.getKeyDownTime('KeyD') - this.input.getKeyDownTime('KeyA');
        let yAxis = this.input.getKeyDownTime('KeyS') - this.input.getKeyDownTime('KeyW');

        this.transform.position.x += 100 * xAxis;
        this.transform.position.y += 100 * yAxis;
    }
}
player.addComponent(PlayerStuff);
player.addComponent(quick.RigidBody2d);

function update()
{
    game.update();
    
    if (ctx)
    {
        game.render(ctx);
    }
    requestAnimationFrame(update);
}
requestAnimationFrame(update);