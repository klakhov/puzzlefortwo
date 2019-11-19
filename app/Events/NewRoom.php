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

class NewRoom implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $new_room;
    /**
     * Create a new event instance.
     *
     * @param Room $new_room
     */
    public function __construct(Room $new_room)
    {
        $this->new_room=$new_room;
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
        return 'new-room';
    }
}
