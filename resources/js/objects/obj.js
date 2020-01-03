export default {
    globalConstants: {
        FRAMES: 60,
        imagesX: 4,
        imagesY: 4,
        countImages: 4 * 4,
        FIELD_WIDTH: 3 / 5, // Размеры поля
        FIELD_HEIGHT: 9 / 11, // Местоположение поля в Field.js -> (27, 28) строки

        KEY_showSilhouette: 83, // S
        // KEY_shouldConnect = 32, // SPACE

        DIRECTORY: "images/",
    },
    SelectFragmentHelper : {
        translatedFragmentId: -1,
        deltaX: 0,
        deltaY: 0
    },
    globalVariables: {
        arr : [],
        shouldConnect : false,
        showSilhouette : false,
         canvas : undefined,
    }
};
