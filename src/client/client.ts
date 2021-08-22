import * as quick from 'quickio';
import './styles';

let canvas = document.querySelector('canvas');
let ctx = canvas?.getContext('2d');

let game = new quick.Game2d();
game.start();
game.constants.g = new quick.Vector2(0, 100);

if (ctx)
{
    game.setRenderingContext(ctx);
}

class PlayerStuff extends quick.Component
{
    private transform!: quick.Transform2d;
    private input!: quick.InputChannel;

    start()
    {
        this.transform = this.entity.getComponent(quick.Transform2d);
        this.transform.position.xy = [ 200, 100 ];
        
        let renderer = this.entity.getComponent(quick.Renderer2d);
        renderer.addRenderStep(
            new quick.PrimitiveShapes.NGon(5, 50),
            new quick.RenderStyle2d().fill(0xff6666).stroke(0x000000).lineWidth(3),
            );

        this.input = this.game.createInputChannel();
        
        let rb = this.entity.addComponent(quick.RigidBody2d);
        rb.angularVelocity = 3;
    }

    update()
    {
        let xAxis = this.input.getKeyDownTime('KeyD') - this.input.getKeyDownTime('KeyA');
        let yAxis = this.input.getKeyDownTime('KeyS') - this.input.getKeyDownTime('KeyW');

        this.transform.position.x += 100 * xAxis;
        this.transform.position.y += 100 * yAxis;
    }
}

let player = game.addEntity();
player.addComponent(PlayerStuff);

class Background extends quick.Component
{
    start()
    {
        let renderer = this.entity.getComponent(quick.Renderer2d);
        renderer.addRenderStep((ctx) =>
        {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 600, 600);
        });
        renderer.zDepth = -1;
    }
}
game.addEntity().addComponent(Background);