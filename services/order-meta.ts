export const PaymentStatus = {
    PAID: {
        code: 'paid',
        label: 'Paid',
        description: 'Payment is paid',
    },
    UNPAID: {
        code: 'unpaid',
        label: 'Unpaid',
        description: 'Payment is unpaid',
    },
    REFUNDED: {
        code: 'refunded',
        label: 'Refunded',
        description: 'Payment is refunded',
    },
};
export const PaymentStatusKey = 'payment_status';

export const OrderStatus = {
    PENDING: {
        code: 'pending',
        label: 'Pending',
        description: 'Order is pending',
    },
    PROCESSING: {
        code: 'processing',
        label: 'Processing',
        description: 'Order is processing',
    },
    COMPLETED: {
        code: 'completed',
        label: 'Completed',
        description: 'Order is completed',
    },
    CANCELLED: {
        code: 'cancelled',
        label: 'Cancelled',
        description: 'Order is cancelled',
    }
};
export const OrderStatusKey = 'order_status';

export const CancelReasonKey = 'cancel_reason';
export const CancelReason = {
    PAYMENT_FAILED: {
        code: 'payment_failed',
        label: 'Payment failed',
        description: 'Payment failed',
    }
}
