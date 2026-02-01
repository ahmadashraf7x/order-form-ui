export const validateCardData = (cardData: {
    number: string;
    expiry: string;
    cvv: string;
}): string | null => {
    if (!cardData.number || cardData.number.length !== 16) {
        return "Please enter a valid card number";
    }

    const cleanExpiry = cardData.expiry.replace(/\D/g, "");

    if (!cleanExpiry || cleanExpiry.length !== 4) {
        return "Please enter card expiry date";
    }

    if (!cardData.cvv || cardData.cvv.length !== 3) {
        return "Please enter CVV";
    }

    return null;
};

export const validateBankData = (bankData: {
    name: string;
    account: string;
}): string | null => {
    if (!bankData.name.trim()) {
        return "Please enter account holder name";
    }

    if (!bankData.account.trim()) {
        return "Please enter account number / IBAN";
    }

    return null;
};
