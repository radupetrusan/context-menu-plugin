import pug from 'rollup-plugin-pug';
import sass from 'rollup-plugin-sass';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.ts',
    name: 'OptionsMenuPlugin',
    plugins: [
        pug({
            pugRuntime: false
        }),
        sass({
            insert: true
        }),
        vue()
    ],
    babelPresets: [
        require('@babel/preset-typescript')
    ],
    extensions: ['.js', '.ts', '.vue'],
    globals: {
        'vue': 'Vue',
        'lodash': '_'
    }
}