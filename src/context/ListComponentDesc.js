
import React, { createContext, useEffect, useState } from "react";

import FeildDesc_Ex from "~/components/YourWordList/AddWordToSub/Custom/FieldDesc_Ex/FeildDesc_Ex";

export const ListComponentDescContext = createContext();
export const ListComponentDescProvider = ({ children }) => {
    const [fieldMain, setFieldMain] = useState([]);
    const [key, setKey] = useState(0);

    const addFieldMain = () => {
        const newIndex = key;
        const object = {
            example: "",
            desc: "",
        };
        const newFieldMainComponent = (
            <FeildDesc_Ex
                key={newIndex}
                index={newIndex}
                data={object}
            />
        );

        setKey((key) => key + 1);
        setFieldMain([...fieldMain, newFieldMainComponent]);
    };

    const Remove = (key) => {
        const newMainComponent = fieldMain.filter(
            (item) => item.props.index !== key
        );
        setFieldMain(newMainComponent);
    };
    return (
        <ListComponentDescContext.Provider
            value={{
                fieldMain,
                addFieldMain,
                Remove


            }}>
            {children}
        </ListComponentDescContext.Provider>
    );
}