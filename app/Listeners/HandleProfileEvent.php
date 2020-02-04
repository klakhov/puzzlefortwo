<?php

namespace App\Listeners;

use App\Events\NewProfileEvent;
use App\ProfileEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Symfony\Component\HttpKernel\Profiler\Profile;

class HandleProfileEvent
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(NewProfileEvent $event)
    {
        switch ($event->type){
            case 'friend_request':{
                $options = $event->options;
                ProfileEvent::createSentRequest($options['user'],$options['friend'],$options['status']);
                ProfileEvent::createReceivedRequest($options['friend'],$options['user'],$options['status']);
                //закрываем ожидающие реквесты
                if($options['status'] == 'accepted' || $options['status'] == 'refused'){
                    $userEvents = ProfileEvent::eventsByUserId($options['user']->id);
                    $waitEvent = $userEvents->filter(function ($event) use ($options){
                        return $event->options['status'] == 'waiting' && $event->options['to'] == $options['friend']->name;
                    })->first();
                    if($waitEvent) $waitEvent->close();

                    $friendEvents = ProfileEvent::eventsByUserId($options['friend']->id);
                    $waitEvent = $friendEvents->filter(function ($event) use ($options){
                        return $event->options['status'] == 'waiting' && $event->options['to'] == $options['user']->name;
                    })->first();
                    if($waitEvent) $waitEvent->close();
                }
                break;
            }
        }
    }
}
