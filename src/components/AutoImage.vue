<script>
  export default {
    props: {
      categoryName: {
        type: String,
        required: true
      }
    },
    methods: {
      getRandomColor(name) {
        // get first alphabet in upper case
        const firstAlphabet = name.charAt(0).toLowerCase()

        // get the ASCII code of the character
        const asciiCode = firstAlphabet.charCodeAt(0)

        // number that contains 3 times ASCII value of character -- unique for every alphabet
        const colorNum =
          asciiCode.toString() + asciiCode.toString() + asciiCode.toString()

        var num = Math.round(0xffffff * parseInt(colorNum))
        var r = (num >> 16) & 255
        var g = (num >> 8) & 255
        var b = num & 255

        return {
          color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.3)',
          character: firstAlphabet.toUpperCase()
        }
      }
    },
    watch: {
      categoryName() {}
    },
    mounted() {
      console.log('categoryName changed')
      let canvas = this.$refs.canvasRef
      let ctx = canvas.getContext('2d')

      ctx.fillStyle = this.getRandomColor(this.categoryName).color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#fff'
      ctx.font = '100px Arial'
      ctx.fillText(
        this.getRandomColor(this.categoryName).character,
        canvas.width / 2 - 30,
        canvas.height / 2 + 30
      )
    }
  }
</script>

<template>
  <canvas ref="canvasRef" width="250" height="250" id="canvas" />
</template>

<style scoped>
  #canvas {
    height: 100px;
  }
</style>
