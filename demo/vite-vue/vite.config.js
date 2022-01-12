const path = require("path")

module.exports = {
    alias: {
        "/comps/": path.resolve(__dirname, "src/components")
    },
    vueCompilerOptions: {
        isCustomElement: tag => tag === "piechart"
    },
    proxy: {
        '/api': {
            target: 'http://jsonplaceholder.typicode.com',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}