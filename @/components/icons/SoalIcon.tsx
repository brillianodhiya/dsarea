import * as React from "react";
const SoalIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M5.23022 16.6711C5.13571 17.0744 4.73217 17.3247 4.32888 17.2302C3.87196 17.1231 3.46242 16.9561 3.09176 16.6917C2.79106 16.4772 2.5229 16.222 2.296 15.9332C1.85872 15.3765 1.67213 14.7284 1.58449 13.9743C1.49997 13.247 1.49998 12.3368 1.5 11.2107V11.1645V9.23157V9.2051V9.20509C1.5 9.13681 1.5 9.06945 1.50001 9.00299C1.50001 9.00199 1.5 9.00099 1.5 9C1.5 8.99696 1.5 8.99392 1.50001 8.99089C1.50019 7.98968 1.50299 7.1925 1.54555 6.53915C1.5919 5.82775 1.68762 5.23556 1.9033 4.68453C2.55124 3.02913 3.91554 1.73695 5.6276 1.12845C6.61834 0.776326 7.81162 0.751572 9.72962 0.750061C9.73641 0.750019 9.7432 0.749998 9.75 0.749998C9.75268 0.749998 9.75535 0.750012 9.75801 0.75004C9.89502 0.749948 10.0357 0.749966 10.1803 0.749985L10.3636 0.750001L10.5213 0.749963C11.718 0.749534 12.5148 0.749249 13.1776 0.984818C14.24 1.36241 15.0918 2.16626 15.4974 3.20257C15.6378 3.56106 15.6958 3.93643 15.7233 4.35862C15.75 4.76873 15.75 5.27132 15.75 5.89278V5.91804L15.75 9.75C15.75 10.1642 15.4142 10.5 15 10.5C14.5858 10.5 14.25 10.1642 14.25 9.75L14.25 5.91804C14.25 5.26539 14.2496 4.81172 14.2265 4.45613C14.2037 4.10707 14.1613 3.90427 14.1006 3.7493C13.8601 3.13472 13.3453 2.63636 12.6753 2.3982C12.2891 2.26095 11.7771 2.25 10.3636 2.25C10.1322 2.25 9.91352 2.2501 9.70666 2.25052C8.76019 2.27353 8 3.04799 8 4C8 4.10552 8.00465 4.22022 8.01083 4.35349L8.01313 4.40254C8.01858 4.51852 8.02465 4.64762 8.02733 4.77638C8.03335 5.06638 8.02489 5.4204 7.93185 5.76764C7.74692 6.45782 7.20782 6.99692 6.51764 7.18185C6.17041 7.27489 5.81638 7.28335 5.52638 7.27732C5.39763 7.27465 5.26854 7.26858 5.15256 7.26313L5.10349 7.26083C4.97023 7.25465 4.85552 7.25 4.75 7.25C3.78603 7.25 3.00411 8.0294 3.00002 8.99241C3 9.07053 3 9.15022 3 9.23157L3 11.1645C3 12.3478 3.00118 13.1706 3.07446 13.8011C3.14576 14.4146 3.27705 14.7539 3.47555 15.0065C3.61297 15.1815 3.77687 15.3379 3.96285 15.4706C4.14283 15.599 4.36246 15.6974 4.67112 15.7698C5.07441 15.8643 5.32472 16.2678 5.23022 16.6711ZM3.07935 6.2117C3.56755 5.91856 4.13909 5.75 4.75 5.75C4.89415 5.75 5.04028 5.75629 5.17301 5.76244L5.22416 5.76483L5.22419 5.76483C5.34192 5.77035 5.44989 5.77541 5.55753 5.77765C5.80808 5.78285 5.99115 5.77001 6.12941 5.73296C6.30196 5.68673 6.43673 5.55195 6.48296 5.37941C6.52001 5.24114 6.53285 5.05807 6.52765 4.80752C6.52541 4.69986 6.52035 4.59187 6.51483 4.47413L6.51245 4.423C6.50629 4.29028 6.5 4.14415 6.5 4C6.5 3.39899 6.66314 2.83609 6.94755 2.35315C6.63181 2.39593 6.37034 2.45639 6.12994 2.54183C4.81017 3.0109 3.78298 3.99759 3.30011 5.23126C3.19683 5.49512 3.12577 5.80054 3.07935 6.2117ZM12.0428 10.6947C12.1723 11.114 12.1104 11.5806 11.9644 12.0373C11.6335 13.072 11.1079 13.9463 10.5233 14.6624C10.5889 14.6509 10.6555 14.6363 10.723 14.6187C11.217 14.4894 11.7179 14.2056 12.1457 13.8764L12.1686 13.8588C12.2939 13.7623 12.4306 13.6571 12.5482 13.5844C12.6119 13.5451 12.7123 13.488 12.8352 13.4513C12.9644 13.4126 13.1756 13.3799 13.4073 13.4729C13.6393 13.5661 13.7661 13.7363 13.8253 13.8318C13.8869 13.9312 13.9259 14.0326 13.9509 14.1046C13.998 14.2404 14.043 14.4183 14.0879 14.5956L14.0947 14.6224C14.1616 14.8865 14.2573 15.1203 14.3645 15.2967C14.4765 15.481 14.5701 15.5527 14.609 15.5724C14.61 15.5729 14.6103 15.5737 14.6106 15.5745C14.6116 15.577 14.6122 15.5786 14.6415 15.5647C14.7157 15.5296 14.8873 15.4068 15.1223 15.0474C15.349 14.7007 15.8138 14.6035 16.1605 14.8301C16.5071 15.0568 16.6044 15.5216 16.3777 15.8683C16.0658 16.3454 15.7068 16.7202 15.2828 16.9207C14.8223 17.1385 14.3462 17.1201 13.9327 16.9113C13.5535 16.7198 13.277 16.3954 13.0827 16.0757C12.9384 15.8383 12.8216 15.5745 12.7317 15.303C12.2624 15.6215 11.7047 15.9123 11.1026 16.0698C10.4952 16.2287 9.81865 16.2562 9.15546 16.0156C8.7353 16.3526 8.32865 16.6188 7.97641 16.8142C7.74777 16.941 7.53429 17.0423 7.34811 17.1142C7.19137 17.1748 6.9667 17.25 6.75 17.25C6.33579 17.25 6 16.9142 6 16.5C6 16.1028 6.30871 15.7778 6.69926 15.7517C6.71073 15.7486 6.74523 15.7391 6.80772 15.7149C6.91645 15.673 7.0668 15.6034 7.24882 15.5025C7.43149 15.4011 7.63825 15.2725 7.85805 15.1165C7.78857 15.0391 7.72087 14.9575 7.65501 14.8717C6.96615 13.974 6.96934 12.9939 7.32784 12.1695C7.66847 11.3862 8.32057 10.7443 8.97203 10.3293C9.30294 10.1185 9.65792 9.95037 10.0071 9.85074C10.3442 9.75453 10.7405 9.70398 11.1181 9.80633C11.54 9.92069 11.8961 10.2198 12.0428 10.6947ZM8.99148 14.1335C8.94274 14.0803 8.89385 14.0221 8.84499 13.9585C8.53386 13.553 8.53066 13.1649 8.70341 12.7676C8.89404 12.3293 9.30443 11.8961 9.77798 11.5944C10.0096 11.4469 10.2327 11.3462 10.4187 11.2932C10.4944 11.2716 10.5583 11.2594 10.6098 11.2539C10.6028 11.3247 10.5835 11.4308 10.5356 11.5804C10.2046 12.6157 9.62348 13.4681 8.99148 14.1335ZM13.3426 14.857L13.3389 14.8592C13.3414 14.8576 13.3427 14.857 13.3426 14.857Z"
      fill="#6A6A6A"
    />
  </svg>
);
export default SoalIcon;
