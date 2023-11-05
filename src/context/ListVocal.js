
import React, { createContext, useEffect, useState } from "react";
import { deleteWordInSub } from "~/api/Subcategory";
export const ListVocalContext = createContext();

export const ListVocalProvider = ({ children }) => {
    const [vocalSelect, setVocalSelect] = useState([]);
    const [isDel, setIsDel] = useState(false)

    const handleWordSelect = async (data) => {
        if (isDel) {
            setVocalSelect([])
            setIsDel(false)
        }
        setVocalSelect((pre) => {
            const checkList = pre.filter((item) => item.defId !== data.defId);
            if (checkList.length === pre.length) {
                return [...pre, data];
            } else {
                return [...checkList];
            }
        });
    }
    const deleteWord = async (idWordlist) => {
        try {
            if (vocalSelect.length > 0) {
                const listWordDel = vocalSelect.map((item) => ({
                    defId: item.defId,
                    vocabId: item.vocabId,
                }));
                const res = await deleteWordInSub(
                    idWordlist,
                    vocalSelect[0].subcategoryId,
                    listWordDel
                );
                setIsDel(true)
            }
        } catch (error) {
            console.log(`Delete Fail`, error)
        }
    }
    return (
        <ListVocalContext.Provider
            value={{
                vocalSelect,
                handleWordSelect,
                isDel,
                deleteWord,
                setVocalSelect
            }}>
            {children}
        </ListVocalContext.Provider>
    );
}