module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    devServer: {
        proxy: {
            '/': {
                target: 'http://101.200.219.50', // 对应自己的接口
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': '',
                },
            },

        },
    },
}
