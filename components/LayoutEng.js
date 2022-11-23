import React, {useState} from 'react';
import { SearchContext } from '../service/SearchContext';
import AllnavEng from '../components/english-view/AllnavEng';

const LayoutEng = ({children}) => {
	const [hideview, setHideView] = useState(false);
	const searchFunc2 = () => {setHideView(true);}
	const crossClick2 = () => {setHideView(false);}

	return (
		<>
			<SearchContext.Provider value={hideview}>
				<AllnavEng searchFunc2={searchFunc2} crossClick2={crossClick2} />
				{children}
			</SearchContext.Provider>
		</>
	)
};

export default LayoutEng;