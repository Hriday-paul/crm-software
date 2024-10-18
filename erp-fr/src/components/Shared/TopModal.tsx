import React, { useCallback, useState } from "react";

const TopModal = ({ children, button, title }: { children: React.ReactNode, button: React.ReactElement, title: string }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenPopup(false);
    }, []);

    const handleOpenBtn = useCallback(() => {
        setOpenPopup(true);
    }, []);

    return (
        <div>
            <span onClick={handleOpenBtn}>
                {button}
            </span>
            {/* Overlay */}
            <div
                className={`fixed top-0 left-0 h-screen w-full backdrop-blur-sm backdrop-opacity-20 bg-black/60 text-inherit z-999 duration-300 ease-in-out ${openPopup ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={handleClose}
            >
                {/* Modal content */}
                <div
                    className={`min-h-40 min-w-80 md:min-w-[450px] max-h-96 bg-white border border-stroke rounded absolute left-1/2 shadow-2xl duration-500 ease-in-out transform transition-all -translate-x-1/2 ${openPopup ? 'top-12 opacity-100' : 'top-0 opacity-0'}`}
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="flex justify-between items-center p-4 border-b border-stroke">
                        <h3 className="text-lg font-medium text-zinc-700 dark:text-gray">{title}</h3>
                        <button type="button" onClick={handleClose} className="text-2xl">&times;</button>
                    </div>

                    <div className="p-4">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopModal;
