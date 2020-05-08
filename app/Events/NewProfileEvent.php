<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewProfileEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $type;
    public $options;
    public $names;
    /**
     * Create a new event instance.
     *
     * @param $type
     * @param $options
     */
    public function __construct($type, $options)
    {
        $this->type = $type;
        $this->options = $options;
        $this->names = [
            $this->options["friend"]->name,
            $this->options["user"]->name,
        ];
    }

    public function broadcastOn()
    {
        return new Channel('profile');
    }

    public function broadcastAs(){
        return 'event';
    }

    public function broadcastWith(){
        return [
            'names'=>$this->names
        ];
    }

}
