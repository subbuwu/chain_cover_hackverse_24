import React from 'react';

const ModalTableItem = ({ policyName, coverageAmount, premAmtPaid }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {policyName}
            </th>
            <td className="px-6 py-4">
                {coverageAmount}
            </td>
            <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Claim</a>
            </td>
        </tr>
    );
};

export default ModalTableItem;
