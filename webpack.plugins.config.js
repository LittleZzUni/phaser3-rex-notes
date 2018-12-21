const path = require('path')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        // single pack
        'plugins': './plugins/index.js',

        // game objects
        'bbcodetextplugin': './plugins/bbcodetext-plugin.js',
        'bbcodetext': './plugins/bbcodetext.js',
        'tagtextplugin': './plugins/tagtext-plugin.js',
        'tagtext': './plugins/tagtext.js',
        'canvasplugin': './plugins/canvas-plugin.js',
        'canvas': './plugins/canvas.js',
        'containerliteplugin': './plugins/containerlite-plugin.js',
        'containerlite': './plugins/containerlite.js',
        'gridtableplugin': './plugins/gridtable-plugin.js',
        'gridtable': './plugins/gridtable.js',
        'roundrectangleplugin': './plugins/roundrectangle-plugin.js',
        'roundrectangle': './plugins/roundrectangle.js',

        // custom file loader      
        'webfontloaderplugin': './plugins/webfontloader-plugin.js',
        'awaitloaderplugin': './plugins/awaitloader-plugin.js',

        // actions                    
        'gridalignplugin': './plugins/gridalign-plugin.js',

        // input
        'touchstateplugin': './plugins/touchstate-plugin.js',
        'dragplugin': './plugins/drag-plugin.js',
        'dragspeedplugin': './plugins/dragspeed-plugin.js',
        'sliderplugin': './plugins/slider-plugin.js',
        'scrollerplugin': './plugins/scroller-plugin.js',
        'buttonplugin': './plugins/button-plugin.js',
        'touchcursorplugin': './plugins/touchcursor-plugin.js',
        'virtualjoystickplugin': './plugins/virtualjoystick-plugin.js',
        'cursoratboundplugin': './plugins/cursoratbound-plugin.js',
        'mousewheeltoupdownplugin': './plugins/mousewheeltoupdown-plugin.js',
        'pinchplugin': './plugins/pinch-plugin.js',

        // member of game object
        'fadeplugin': './plugins/fade-plugin.js',
        'scaleplugin': './plugins/scale-plugin.js',
        'pathfollowerplugin': './plugins/pathfollower-plugin.js',
        'movetoplugin': './plugins/moveto-plugin.js',
        'rotatetoplugin': './plugins/rotateto-plugin.js',
        'flashplugin': './plugins/flash-plugin.js',
        'interceptionplugin': './plugins/interception-plugin.js',
        // member of game object, arcade behavior
        'eightdirectionplugin': './plugins/eightdirection-plugin.js',
        'bulletplugin': './plugins/bullet-plugin.js',

        // member of text
        'texttypingplugin': './plugins/texttyping-plugin.js',
        'textpageplugin': './plugins/textpage-plugin.js',

        // member of scene
        // sound
        'soundfadeplugin': './plugins/soundfade-plugin.js',

        // control
        'sequenceplugin': './plugins/sequence-plugin.js',
        'fsmplugin': './plugins/fsm-plugin.js',
        'tcrpplugin': './plugins/tcrp-plugin.js',
        'csvscenarioplugin': './plugins/csvscenario-plugin.js',
        'waitevents': './plugins/waitevents-plugin.js',
        'achievementsplugin': './plugins/achievements-plugin.js',
        'conditionstableplugin': './plugins/conditionstable-plugin.js',

        // time
        'clockplugin': './plugins/clock-plugin.js',
        'lifetimeplugin': './plugins/lifetime-plugin.js',

        // data structure
        'csvtoarrayplugin': './plugins/csvtoarray-plugin.js',
        'csvtohashtableplugin': './plugins/csvtohashtable-plugin.js',
        'restorabledataplugin': './plugins/restorabledata-plugin.js',
        'buffdataplugin': './plugins/buffdata-plugin.js',

        // math
        'gashaponplugin': './plugins/gashapon-plugin.js',
        // geom
        'rhombusplugin': './plugins/rhombus-plugin.js',
        'hexagonplugin': './plugins/hexagon-plugin.js',

        // string
        'xorplugin': './plugins/xor-plugin.js',
        'lzstringplugin': './plugins/lzstring-plugin.js',

        // shader
        'swirlpipelineplugin': './plugins/swirlpipeline-plugin.js',
        'pixelationpipelineplugin': './plugins/pixelationpipeline-plugin.js',

        // board
        'boardplugin': './plugins/board-plugin.js',

        // templates
        'bejeweled': './templates/bejeweled/Bejeweled.js',
        'uiplugin': './templates/ui/ui-plugin.js',
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './plugins/dist'),
        filename: 'rex[name].min.js',
        library: {
            root: 'rex[name]'
        },
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                include: /\.min\.js$/,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: true,
                    ie8: false,
                    output: {
                        comments: false
                    },
                    warnings: false
                },
                warningsFilter: () => false
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            WEBGL_RENDERER: true,
            CANVAS_RENDERER: true
        }),
        new CleanWebpackPlugin(['./plugins/dist'])
    ],
    resolve: {
        alias: {
            // 'rexPlugins': path.resolve(__dirname, 'plugins/'),
            // 'rexTemplates': path.resolve(__dirname, 'templates/'),
        }
    }
}