import * as React from "react";
const KelasIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      className="selected-icon"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.875 1.5L4.82703 1.5C4.24945 1.49996 3.74265 1.49992 3.3349 1.55474C2.89432 1.61397 2.45888 1.7493 2.1041 2.10409C1.74931 2.45888 1.61398 2.89432 1.55475 3.3349C1.49992 3.74265 1.49996 4.24944 1.5 4.82703L1.5 4.875L1.5 4.92297C1.49996 5.50056 1.49992 6.00735 1.55475 6.41511C1.61398 6.85568 1.74931 7.29112 2.1041 7.64591C2.45888 8.0007 2.89432 8.13602 3.3349 8.19526C3.74265 8.25008 4.24945 8.25004 4.82704 8.25L4.875 8.25L4.92297 8.25C5.50056 8.25004 6.00736 8.25008 6.41511 8.19526C6.85569 8.13602 7.29112 8.0007 7.64591 7.64591C8.0007 7.29112 8.13603 6.85568 8.19526 6.41511C8.25008 6.00735 8.25005 5.50056 8.25001 4.92297L8.25 4.875L8.25001 4.82703C8.25005 4.24944 8.25008 3.74265 8.19526 3.3349C8.13603 2.89432 8.0007 2.45888 7.64591 2.10409C7.29112 1.7493 6.85569 1.61397 6.41511 1.55474C6.00736 1.49992 5.50056 1.49996 4.92298 1.5L4.875 1.5ZM3.16476 3.16475C3.19439 3.13512 3.26053 3.07824 3.53477 3.04136C3.83059 3.00159 4.23508 3 4.875 3C5.51493 3 5.91942 3.00159 6.21524 3.04136C6.48948 3.07824 6.55562 3.13512 6.58525 3.16475C6.61489 3.19439 6.67177 3.26052 6.70864 3.53477C6.74841 3.83059 6.75 4.23508 6.75 4.875C6.75 5.51492 6.74841 5.91941 6.70864 6.21523C6.67177 6.48948 6.61489 6.55561 6.58525 6.58525C6.55562 6.61488 6.48948 6.67176 6.21524 6.70864C5.91942 6.74841 5.51493 6.75 4.875 6.75C4.23508 6.75 3.83059 6.74841 3.53477 6.70864C3.26053 6.67176 3.19439 6.61488 3.16476 6.58525C3.13512 6.55561 3.07824 6.48948 3.04137 6.21523C3.0016 5.91941 3 5.51492 3 4.875C3 4.23508 3.0016 3.83059 3.04137 3.53477C3.07824 3.26052 3.13512 3.19439 3.16476 3.16475ZM4.875 9.75L4.82703 9.75C4.24945 9.74996 3.74265 9.74992 3.3349 9.80474C2.89432 9.86397 2.45888 9.99931 2.1041 10.3541C1.74931 10.7089 1.61398 11.1443 1.55475 11.5849C1.49992 11.9926 1.49996 12.4994 1.5 13.077L1.5 13.125L1.5 13.173C1.49996 13.7506 1.49992 14.2574 1.55475 14.6651C1.61398 15.1057 1.74931 15.5411 2.1041 15.8959C2.45888 16.2507 2.89432 16.386 3.3349 16.4453C3.74265 16.5001 4.24945 16.5 4.82704 16.5L4.875 16.5L4.92297 16.5C5.50056 16.5 6.00736 16.5001 6.41511 16.4453C6.85569 16.386 7.29112 16.2507 7.64591 15.8959C8.0007 15.5411 8.13603 15.1057 8.19526 14.6651C8.25008 14.2574 8.25005 13.7506 8.25001 13.173L8.25 13.125L8.25001 13.077C8.25005 12.4994 8.25008 11.9926 8.19526 11.5849C8.13603 11.1443 8.0007 10.7089 7.64591 10.3541C7.29112 9.99931 6.85569 9.86397 6.41511 9.80474C6.00736 9.74992 5.50056 9.74996 4.92298 9.75L4.875 9.75ZM3.16476 11.4148C3.19439 11.3851 3.26053 11.3282 3.53477 11.2914C3.83059 11.2516 4.23508 11.25 4.875 11.25C5.51493 11.25 5.91942 11.2516 6.21524 11.2914C6.48948 11.3282 6.55562 11.3851 6.58525 11.4148C6.61489 11.4444 6.67177 11.5105 6.70864 11.7848C6.74841 12.0806 6.75 12.4851 6.75 13.125C6.75 13.7649 6.74841 14.1694 6.70864 14.4652C6.67177 14.7395 6.61489 14.8056 6.58525 14.8352C6.55562 14.8649 6.48948 14.9218 6.21524 14.9586C5.91942 14.9984 5.51493 15 4.875 15C4.23508 15 3.83059 14.9984 3.53477 14.9586C3.26053 14.9218 3.19439 14.8649 3.16476 14.8352C3.13512 14.8056 3.07824 14.7395 3.04137 14.4652C3.0016 14.1694 3 13.7649 3 13.125C3 12.4851 3.0016 12.0806 3.04137 11.7848C3.07824 11.5105 3.13512 11.4444 3.16476 11.4148ZM10.5 3C10.5 2.58579 10.8358 2.25 11.25 2.25H15.75C16.1642 2.25 16.5 2.58579 16.5 3C16.5 3.41421 16.1642 3.75 15.75 3.75H11.25C10.8358 3.75 10.5 3.41421 10.5 3ZM11.25 10.5C10.8358 10.5 10.5 10.8358 10.5 11.25C10.5 11.6642 10.8358 12 11.25 12H15.75C16.1642 12 16.5 11.6642 16.5 11.25C16.5 10.8358 16.1642 10.5 15.75 10.5H11.25ZM10.5 6.75C10.5 6.33579 10.8358 6 11.25 6H15.75C16.1642 6 16.5 6.33579 16.5 6.75C16.5 7.16421 16.1642 7.5 15.75 7.5H11.25C10.8358 7.5 10.5 7.16421 10.5 6.75ZM11.25 14.25C10.8358 14.25 10.5 14.5858 10.5 15C10.5 15.4142 10.8358 15.75 11.25 15.75H15.75C16.1642 15.75 16.5 15.4142 16.5 15C16.5 14.5858 16.1642 14.25 15.75 14.25H11.25Z"
      fill="#6A6A6A"
    />
  </svg>
);
export default KelasIcon;
