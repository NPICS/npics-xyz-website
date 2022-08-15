import {createRef, useEffect, useRef, useState} from "react";
// const jazzicon = require("@metamask/jazzicon")

export default function Jazzicon(props: {
    address: string,
    size?: number
}) {
    const [container, setContainer] = useState<HTMLElement | null>(null)

    // useEffect(() => {
    //     removeExistingChildren()
    //     let el = jazzicon(props.size ?? 40, "0xd0D4701A235BFdA9eE63ed68778962D5059ee2E5:50")
    //     container?.appendChild(el)
    // }, [props.address])
    //
    // function removeExistingChildren() {
    //     if (container) {
    //         for (let i = 0; i < container.children.length; i++) {
    //             container.removeChild(container.children[i])
    //         }
    //     }
    // }

    return <div ref={setContainer}>{}</div>
}