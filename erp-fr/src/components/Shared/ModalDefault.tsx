import React, { useRef } from 'react';

const ModalDefault = React.memo(({ children, clicker, title }: { children: React.ReactNode, clicker: React.ReactElement, title: string }) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    return (
        <>
            <span onClick={() => modalRef?.current?.showModal()}>
                {clicker}
            </span>
            <dialog ref={modalRef} className="modal">

                <div className='modal-box !rounded dark:!bg-boxdark !z-20 !p-0'>
                    <div className="flex justify-between items-center px-4 py-2 border-b border-stroke dark:border-strokedark">
                        <h3 className="text-lg font-medium text-zinc-700 dark:text-gray">{title}</h3>
                        <button type="button" onClick={() => modalRef?.current?.close()} className="text-2xl hover:bg-slate-100 dark:hover:bg-boxdark-2 duration-150 py-0.5 px-2.5">&times;</button>
                    </div>
                    {children}
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
});

export default ModalDefault;