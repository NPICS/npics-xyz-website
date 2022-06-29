import {createRef, useEffect, useRef, useState} from "react";
// import jazzicon from '@metamask/jazzicon';
const jazzicon = require("jazzicon")

export default function Jazzicon(props: {
    address: string,
    size?: number
}) {
    const [container, setContainer] = useState<HTMLElement | null>(null)

    useEffect(() => {
        removeExistingChildren()
        let el = jazzicon(props.size ?? 40, props.address.toLowerCase())
        container?.appendChild(el)
    }, [props.address])

    function removeExistingChildren() {
        if (container) {
            for (let i = 0; i < container.children.length; i++) {
                container.removeChild(container.children[i])
            }
        }
    }

    return <div ref={setContainer}>{}</div>
}