<?php

namespace App\Events;

use App\Room;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DestroyRoom implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    protected $room;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Room $room)
    {
        $this->room =$room;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('rooms');
    }

    public function broadcastAs()
    {
        return 'destroy-room';
    }

    public function broadcastWith()
    {
        return[
            'uid'=>$this->room->uid,
        ];
    }
}
