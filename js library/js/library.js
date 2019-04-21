let libraryStructure = [
    {
        folderName: 'Общая информация',
        dataFolder: '10'
    },
    {
        folderName: 'Инструкции Найз',
        dataFolder: '0'
    },
    {
        folderName: 'Инструкции конкурентных НПВП',
        dataFolder: '1'
    },
    {
        folderName: 'Артериальное давление',
        dataFolder: '2'
    },
    {
        folderName: 'Гепатобилиарная система',
        dataFolder: '3'
    },
    {
        folderName: 'Дозозависимая селективность мелоксикама',
        dataFolder: '4'
    },
    {
        folderName: 'ЖКТ',
        dataFolder: '5'
    },
    {
        folderName: 'Защита суставного хряща',
        dataFolder: '6'
    },
    {
        folderName: 'Итальянское исслед. по безопасности со стороны ЖКТ',
        dataFolder: '7'
    },
    {
        folderName: 'Постулаты Вена',
        dataFolder: '8'
    },
    {
        folderName: 'Работа с возражениями',
        dataFolder: '9'
    }
];

let pdfStructure = [
    {
        folder: '10',
        files: [
            {
                json: 'pdf0',
                name: 'Аптека'

            },
            {
                json: 'pdf29',
                name: 'Руководство пользователя'

            },
            {
                json: 'pdf30',
                name: 'Что такое Medznat?'

            },
            {
                json: 'pdf32',
                name: 'Статья Парфенова'

            }
        ]
    },
    {
        folder: '0',
        files: [
            {
                json: 'pdf22',
                name: 'Найз. Инструкция по препарату'

            },
            {
                json: 'pdf21',
                name: 'Найз гранулы. Инструкция по препарату'

            }
        ]
    },
    {
        folder: '1',
        files: [
            {
                json: 'pdf12',
                name: 'Аркоксиа'

            },
            {
                json: 'pdf13',
                name: 'Аэртал'

            },
            {
                json: 'pdf14',
                name: 'Мовалис таблетки'

            },
            {
                json: 'pdf15',
                name: 'Нимесил'

            },
            {
                json: 'pdf16',
                name: 'Нимесулид-Реплекфарма'

            },
            {
                json: 'pdf17',
                name: 'Нимесулид-Тева'

            },
            {
                json: 'pdf18',
                name: 'Целебрекс'

            }
        ]
    },
    {
        folder: '2',
        files: [
            {
                json: 'pdf1',
                name: 'Нимесулид(Найз) Диклофенак при АГ'

            }
        ]
    },
    {
        folder: '3',
        files: [
            {
                json: 'pdf2',
                name: 'Данные РЗН. Анализ спонтанных сообщений российских врачей о НЯ'

            },
            {
                json: 'pdf3',
                name: 'Почему российские врачи используют нимесулид Каратеев РМЖ'

            }
        ]
    },
    {
        folder: '4',
        files: [
            {
                json: 'pdf4',
                name: '2 American Journal of Medicine 2004, 117(2), 100-106 Оригинал'

            },
            {
                json: 'pdf5',
                name: '2 American Journal of Medicine 2004, 117(2), 100-106 Перевод'

            }
        ]
    },
    {
        folder: '5',
        files: [
            {
                json: 'pdf6',
                name: 'Почему российские врачи используют нимесулид Каратеев РМЖ2013'

            },
            {
                json: 'pdf7',
                name: 'Сравнительная оценка влияния нимесулида на верхние отделы ЖКТ Каратеев 2015'

            }
        ]
    },
    {
        folder: '6',
        files: [
            {
                json: 'pdf8',
                name: 'Зарубежная статьи. Защита суставного хряща. ММП'

            },
            {
                json: 'pdf9',
                name: 'Относительный риск развития ЖКТ при применении НПВП'

            },
            {
                json: 'pdf10',
                name: 'Перевод статьи. Защита суставного хряща. ММП'

            },
            {
                json: 'pdf11',
                name: 'Проблемы лечения боли при остеоартрозе'

            }
        ]
    },
    {
        folder: '7',
        files: [
            {
                json: 'pdf19',
                name: 'Фриули-Венеция-Джулия Оригинал'

            },
            {
                json: 'pdf20',
                name: 'Фриули-Венеция-Джулия Перевод'

            }
        ]
    },
    {
        folder: '8',
        files: [
            {
                json: 'pdf23',
                name: 'Постулаты Вена (Eng)'

            },
            {
                json: 'pdf24',
                name: 'Постулаты Вена (Rus)'

            }
        ]
    },
    {
        folder: '9',
        files: [
            {
                json: 'pdf25',
                name: 'Найз vs Аэртал'

            },
            {
                json: 'pdf26',
                name: 'Найз vs Коксибы'

            },
            {
                json: 'pdf27',
                name: 'Найз vs Мелоксикам'

            },
            {
                json: 'pdf28',
                name: 'Найз vs Тексамен'

            }
        ]
    }
];


let library = document.querySelector('.js-library');
let main = document.querySelector('.js-main-lib');


for (let i = 0; i < libraryStructure.length; i++) {
    let folder = document.createElement('div');
    folder.className = 'library__item';
    folder.setAttribute('data-folder', libraryStructure[i]['dataFolder']);

    let img = document.createElement('div');
    img.className = 'library__folder';
    let name = document.createElement('div');
    name.className = 'library__name';
    name.textContent = libraryStructure[i]['folderName'];
    folder.appendChild(img);
    folder.appendChild(name);
    library.appendChild(folder);
    $(folder).on('click', function (e) {
        var $link = $(e.currentTarget).data('folder');
        if (typeof $link == 'number') {
            $('.library__section_' + $link).addClass('library__section_show');
            $('.library__back').addClass('library__back_active');
            $('.library__section_main').removeClass('library__section_show');
        }
    });
}

for (let i = 0; i < pdfStructure.length; i++) {
    let mainFolder = document.createElement('div');
    mainFolder.className = `library__section library__section_${pdfStructure[i]['folder']}`;
    for (let j = 0; j < pdfStructure[i]['files'].length; j++) {
        let folder = document.createElement('div');
        folder.className = 'library__item';
        folder.setAttribute('data-pdf', pdfStructure[i]['files'][j]['json']);

        let img = document.createElement('div');
        img.className = 'library__pdf';
        let name = document.createElement('div');
        name.className = 'library__name';
        name.textContent = pdfStructure[i]['files'][j]['name'];
        folder.appendChild(img);
        folder.appendChild(name);
        mainFolder.appendChild(folder);
    }
    main.appendChild(mainFolder);


}


let back = document.createElement('div');
back.className = 'library__back';
main.appendChild(back);

$('[data-pdf]').on('click', function (e) {
    console.log('PDF');
    var $link = $(e.currentTarget).data('pdf');
    if ($link) {
        CommunicateEmbedded.openAttachment($link);
    }
});


$('.library__close').on('click', function (e) {
    $('.library').removeClass('library_show');
});
$('.library__back').on('click', function (e) {
    if ($(e.currentTarget).hasClass('library__back_active')) {
        $(e.currentTarget).removeClass('library__back_active');
        $('.library__section').removeClass('library__section_show');
        $('.library__section_main').addClass('library__section_show');
    }
});


