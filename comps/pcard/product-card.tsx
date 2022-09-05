import {Product} from '@prisma/client';
import {getImageUrl} from '../../lib/config';
import {useState} from 'react';
import {cartActions} from '../../states/cart';
import {numberToMoney} from '../../lib/utils';


interface Props {
    product: Product;
}

function Quantity({quantity, setQuantity, disable}: any) {

    return (
        <span className={'qtyva' + (
            disable ? ' disabled' : ''
        )}>
            <button onClick={() => {
                if (disable) return;
                if (quantity > 0) {
                    setQuantity(quantity - 1);
                }
            }}>-</button>
            <div className={'value'}>
                <span>{quantity}</span>
            </div>
            <button onClick={() => {
                if (disable) {
                    return;
                }
                if (quantity > 30) {
                    return;
                }
                setQuantity(quantity + 1);
            }}>+</button>
        </span>
    );
}


export function ProductCard({product}: Props) {
    const [v1Qty, setV1Qty] = useState(product.variant1InStock ? 0 : 0);
    const [v2Qty, setV2Qty] = useState(product.variant2InStock ? 0 : 0);

    const getV1Qty = () => product.variant1Price * v1Qty;
    const getV2Qty = () => product.variant2Price * v2Qty;
    const getTotal = () => (getV1Qty() + getV2Qty()).toFixed(2);

    const onAddToCart = () => {
        cartActions.add(product, v1Qty, v2Qty);

        // clear quantity
        setV1Qty(product.variant1InStock ? 0 : 0);
        setV2Qty(product.variant2InStock ? 0 : 0);
    };

    const VariationInfo = (prop: {price: number, name: string, qty: number, setQty: any, isInStock: boolean}) => {
        return (
            <>
                <div className={'total'}><span>SGD {numberToMoney(prop.price)}</span></div>
                <div className={'var-name'}>{prop.name}</div>
                <Quantity quantity={prop.qty} setQuantity={prop.setQty} disable={!prop.isInStock}/>
            </>
        );
    };

    return (
        <div className={'pcard-outer'}>
            <div className={'inner row'}>
                <div className={'image order-1 col-6 col-sm-3 pe-0'}>
                    <div className={'image-container position-relative'}>
                        <img src={getImageUrl(product.imageId)} alt=""/>
                        <h2 className={'name'}>{product.name}</h2>
                    </div>
                </div>
                <div className={'var var1 order-3 order-sm-2 col-6 col-sm-3 mt-4 mt-sm-0 pe-0'}>
                    <VariationInfo price={product.variant1Price} name={product.variant1Name} qty={v1Qty}
                                   setQty={setV1Qty} isInStock={product.variant1InStock}/>
                </div>
                <div className={'var var2 order-4 order-sm-3 col-6 col-sm-3 mt-4 mt-sm-0 ps-0'}>
                    <VariationInfo price={product.variant2Price} name={product.variant2Name} qty={v2Qty}
                                   setQty={setV2Qty} isInStock={product.variant2InStock}/>
                </div>
                <div className={'atc  order-2 order-sm-4 col-6 col-sm-3'}>
                    <div className={'item-total'}>
                        <span>SGD {getTotal()}</span>
                    </div>
                    <button className={'atc-btn'} onClick={onAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
