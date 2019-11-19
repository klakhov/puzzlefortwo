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

class AcceptRoom implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $accepted_room;
    public $accept_type;

    /**
     * Create a new event instance.
     *
     * @param Room $room
     * @param $accept_type
     */
    public function __construct(Room $room, $accept_type)
    {
        $this->accepted_room=$room;
        $this->accept_type=$accept_type;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel("rooms");
    }

    public function broadcastAs()
    {
        return $this->accepted_room->uid;
    }

    public function broadcastWith()
    {
        return [
          'type' => $this->accept_type,
          'accepted_room'=> $this->accepted_room
        ];
    }
}
