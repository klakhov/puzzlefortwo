export  default {
    globalVariables:{
        FRAMES: 45,
        imagesX:4,
        imagesY:4,
        countImages: 4*4,

        FIELD_WIDTH:1, // Размеры поля
        FIELD_HEIGHT: 10 / 11, // Местоположение поля в Fragment.js -> (61, 62) строки

        KEY_showSilhouette: 83, // S
        KEY_shouldConnect: 32, // SPACE

        DIRECTORY: "../img/",
    },
    objects:{
        SelectFragmentHelper: {
                translatedFragmentId: -1,
                deltaX: 0,
                deltaY: 0
        },
        // Ссылки на первый, последний элементы двусвязного списка фрагментов или групп фрагментов для правильного
        // отображения поверх остальных элементов на экране
        ListObjectHelper: {
            lastVisualObject: null,
            firstVisualObject: null
        },
        FragmentsGeneralCharacteristic: {
            SCALE: -1,
            downloadedImages: 0,
            width: -1,
            height: -1,
            widthScale: -1,
            heightScale: -1,
            third_x: -1,
            third_y: -1,
            connectRange: -1
        },
        CanvasCharacteristic: {
            all_width: -1,
            all_height: -1,
            width: -1,
            height: -1,
            lastX: -1,
            lastY: -1,
            firstX: -1,
            firstY: -1,
        }
    }
};
