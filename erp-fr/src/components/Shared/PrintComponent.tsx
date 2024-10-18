import { useReactToPrint } from "react-to-print";

import React, { useRef } from 'react';

const PrintComponent = React.memo(({ children, clicker, title, landscape = false }: { children: React.ReactNode, clicker: React.ReactElement, title : string, landscape ?: boolean }) => {
    const contentToPrint = useRef(null);
    // const styles = useSelector((state: RootState) => state.styles);

    const handlePrint = useReactToPrint({
        documentTitle: title,
        content: () => contentToPrint.current,
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
        pageStyle: `@page { size: ${landscape ? 'landscape' : 'auto'}; margin: 10mm; }`
    });

    return (
        <div>
            <span onClick={handlePrint}>
                {clicker}
            </span>
            <div className="overflow-hidden h-0 hidden">
                <div ref={contentToPrint}>
                    {children}
                </div>
            </div>
        </div>
    );
});

export default PrintComponent;