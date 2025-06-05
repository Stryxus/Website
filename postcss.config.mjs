import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
    plugins: [
        cssnano({ preset: 'advanced', plugins: [autoprefixer] })
    ]
};