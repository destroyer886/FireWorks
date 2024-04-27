// import utils from './utils'
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects

  function constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    // this.radient = radient;
    this.velocity = velocity
    this.gravity = 0.01
    this.alpha = 1;
  

  this.draw = ()=>{
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  this.update = () => {
    this.draw()
    this.alpha -= 0.005;
    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;
    this.velocity.y += this.gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

}


// Implementation
let objects = [];
function init() {
  



  addEventListener('click', (e)=>{

    const anglevalue = (Math.PI * 2) / 100;
    console.log(anglevalue)

    

    for (let i = 0; i < 150; i++) {
      // let radient = Math.random();
      const velocity = {
        x: Math.cos(anglevalue * i) * Math.random() * 5,
        y: Math.sin(anglevalue * i)* Math.random() * 5
      }

      objects.push(new constructor(e.clientX , e.clientY , 2, `hsl(${Math.random() * 450}, 50% , 50% )`, velocity))
    }
  })


}

console.log(objects)

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height);


  
  objects.forEach((object , i) => {
   if(object.alpha > 0){
    object.update()
   }else{
    objects.splice(i,1)
   }
  })
}


init()
animate()
