export  default {
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
