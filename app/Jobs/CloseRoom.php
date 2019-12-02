<?php

namespace App\Jobs;

use App\Events\DestroyRoom;
use App\Room;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CloseRoom implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $room;

    /**
     * Create a new job instance.
     *
     * @param Room $room
     */
    public function __construct(Room $room)
    {
        $this->room = $room;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->room->status = 'closed';
        $this->room->save();
        event(new DestroyRoom($this->room));
    }
}
