import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

interface LoadingProps {
	destination: string;
}

function Loading({ destination }: LoadingProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className="text-2xl font-UI flex items-center justify-center h-full w-full text-dark-green">
			<div className="flex flex-col p-10 mx-auto items-center justify-center">
				<div><svg className="animate-spin h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 mr-3 my-3" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="none" strokeWidth="4" fill="green"/>
					<path
						className="opacity-75"
						fill="green"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				</div>
				<div><h1 className="text-xs sm:text-base md:text-xl lg:text-2xl">Taking you to {destination} page...</h1></div>
			</div>
		</div>
	);

};

export default Loading;