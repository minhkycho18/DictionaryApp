import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const CardLoader = () => (
    <ContentLoader
        speed={2}
        width={476}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <Rect x="94" y="14" rx="3" ry="3" width="88" height="15" />
        <Rect x="285" y="13" rx="3" ry="3" width="52" height="15" />
        <Rect x="94" y="51" rx="3" ry="3" width="203" height="15" />
        <Rect x="95" y="77" rx="3" ry="3" width="134" height="15" />
        <Rect x="7" y="10" rx="10" ry="10" width="72" height="94" />
    </ContentLoader>
)

export default CardLoader