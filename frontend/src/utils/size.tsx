import { useMediaQuery,useTheme  } from "@material-ui/core";
import React from "react";


const useSize = () =>{
    const theme = useTheme()
    const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));
    return { isMobileSize };
}

export default useSize