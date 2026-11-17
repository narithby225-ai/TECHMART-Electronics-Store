<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total', 10, 2);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->string('shipping_address');
            $table->string('promo_code')->nullable();
            $table->enum('delivery_status', ['preparing', 'out_for_delivery', 'delivered'])->default('preparing');
            $table->timestamp('status_timestamp')->useCurrent();
            $table->date('estimated_delivery')->nullable();
            $table->json('courier_info')->nullable();
            $table->string('delivered_to')->nullable();
            $table->text('delivery_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
