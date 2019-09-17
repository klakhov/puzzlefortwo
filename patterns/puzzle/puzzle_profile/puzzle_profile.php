<link rel="stylesheet" href="../../patterns/puzzle/left_menu_switcher.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_profile/styles/puzzle_profile.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_profile/styles/puzzle_profile_main.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_profile/styles/puzzle_profile_buttons.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_profile/styles/puzzle_profile_achievements.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_profile/styles/puzzle_profile_last_events.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_profile/styles/puzzle_profile_settings.css">
<div class="left_menu_switcher">
    <main id="profile-window">
        <div class="profile-left">
            <div id="profile-main">
                <div id="profile-with-image">
                    <div id="profile-image">
                        <div id="image-label">
                            ADMIN
                        </div>
                        <div id="profile-hint">
                            <p>
                                Участие в создании PFT
                            </p>
                        </div>
                    </div>
                </div>
                <div id=profile-without-image>
                    <div id="profile-name"><?=$_SESSION['login']?></div>
                    <div id="profile-description">
                        Член коллектива в каком-то из смыслов
                    </div>
                    <div id="profile-buttons">
                        <button id="follow">Подписаться</button>
                        <button id="invite">Пригласить</button>
                        <button id="connect">Присоединиться</button>
                    </div>
                </div>
            </div>
            <div id="achievements">
                <div class="section-name">
                    Достижения
                </div>
                <div id="achievements-overflow">
                    <div class="achievement-elem">
                        <div class="achievement-image"></div>
                        <div class="achievement-other">
                            <div class="achievement-name">
                                Получить пиздюлей
                            </div>
                            <div class="achievement-description">
                                Прогулять физкультуру в вузе один раз
                            </div>
                            <div class="achievement-state" 
                                 style="border-left-width: 380px;"></div>
                        </div>
                    </div>
                    <div class="achievement-elem">
                        <div class="achievement-image"></div>
                        <div class="achievement-other">
                            <div class="achievement-name">
                                P.S hover на ADMIN
                            </div>
                            <div class="achievement-description">
                                Посмотреть свой профиль, фоточка временная в images папке
                            </div>
                            <div class="achievement-state"
                                 style="border-left-width: 100px;"
                                 ></div>
                        </div>
                    </div>
                    <div class="achievement-elem">
                        <div class="achievement-image"></div>
                        <div class="achievement-other">
                            <div class="achievement-name">
                                Поспать на лекциях
                            </div>
                            <div class="achievement-description">
                                Сходить на несколько лекций
                            </div>
                            <div class="achievement-state"
                                 style="border-left-width: 200px;"
                                 >
                            </div>
                        </div>
                    </div>
                    <div class="achievement-elem">
                        <div class="achievement-image"></div>
                        <div class="achievement-other">
                            <div class="achievement-name">
                                Показать эту парашу
                            </div>
                            <div class="achievement-description">
                                собсна показать этот калл другим
                            </div>
                            <div class="achievement-state"
                                 style="border-left-width: 100px;"
                                 ></div>
                        </div>
                    </div>
                    <div class="achievement-elem">
                        <div class="achievement-image"></div>
                        <div class="achievement-other">
                            <div class="achievement-name">
                                Получить пиздюлей
                            </div>
                            <div class="achievement-description">
                                Прогулять физкультуру в вузе один раз
                            </div>
                            <div class="achievement-state"></div>
                        </div>
                    </div>
                    <div class="achievement-elem">
                        <div class="achievement-image"></div>
                        <div class="achievement-other">
                            <div class="achievement-name">
                                Получить пиздюлей
                            </div>
                            <div class="achievement-description">
                                Прогулять физкультуру в вузе один раз
                            </div>
                            <div class="achievement-state"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-middle">
            <div class="section-name">
                Последние события
            </div>
            <div id="events-overflow">
                <div class="event">
                    <label>Сыграна игра #1338</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1337</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1336</label>
                </div>
                <div class="event">
                    <label>Создано это меню</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1336</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1335</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1334</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1333</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1332</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1331</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1330</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1329</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1328</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1327</label>
                </div>
                    <div class="event">
                    <label>Сыграна игра #1326</label>
                </div>
                <div class="event">
                    <label>Сыграна игра #1325</label>
                </div>
            </div>
        </div>
        <div class="profile-right">
            <div class="section-name" id="stg_email">
                Настройки аккаунта
            </div>
            <div id="settings-elems">
                <div class="settings-checkbox-elem">
                    <input class="checkbox" type="checkbox">
                    <label class="checkbox-label">Закрытый аккаунт</label>
                </div>
                <div class="settings-checkbox-elem">
                    <input class="checkbox" type="checkbox">
                    <label class="checkbox-label">Нецензурная лексика в чате</label>
                </div>
                <div class="settings-checkbox-elem">
                    <input class="checkbox" type="checkbox">
                    <label class="checkbox-label">Уведомления о достижениях</label>
                </div>
                <div class="settings-checkbox-elem">
                    <input class="checkbox" type="checkbox">
                    <label class="checkbox-label">Включить приглашения</label>
                </div>
                <div class="settings-checkbox-elem">
                    <input class="checkbox" type="checkbox">
                    <label class="checkbox-label">Прочее говно</label>
                </div>
            </div>
        </div>
    </main>
    <script type="text/javascript" src="../../service/apps/profile/profile-get.js"></script>
</div>
