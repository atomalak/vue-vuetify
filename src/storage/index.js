
export const getCustomerPolicies = (customerid) => {
    let customerpolicies = JSON.parse(localStorage.getItem("customerpolicies"));
    customerpolicies = customerpolicies.filter((item) => {
        return item.customerId == customerid
    })
    if (customerpolicies.length > 0) {
        customerpolicies.map((item) => {
            item.policyname = getSpecificPolicy(item.policyId);
        })
        return customerpolicies;
    }
    return [];
}

export const removePolicyFromCustomer = (id,customerid) => {
    let customerpolicies = JSON.parse(localStorage.getItem("customerpolicies"));
    customerpolicies = customerpolicies.filter((item) => {
        return item.policyId !== id && item.customerId==customerid
    })
    localStorage.setItem("customerpolicies", JSON.stringify(customerpolicies));

}

export const saveCustomerPolicies = (customerPolicies) => {
    if (localStorage.getItem("customerpolicies") == null) {
        let cp = [];
        cp.push(customerPolicies);
        localStorage.setItem("customerpolicies", JSON.stringify(cp))
    } else {
        let cp = JSON.parse(localStorage.getItem("customerpolicies"));
        cp.push(customerPolicies);
        localStorage.setItem("customerpolicies", JSON.stringify(cp));
    }
}

export const savePolicy = (policy) => {
    if (localStorage.getItem("policies") == null) {

        localStorage.setItem("policies", policy)
    } else {
        let policies = JSON.parse(localStorage.getItem("policies"));
        policies.push(policy);
        localStorage.setItem("policies", JSON.stringify(policies));
    }
}

export const saveCustomer = (customer) => {
    if (localStorage.getItem("customers") == null) {
        localStorage.setItem("customers", JSON.stringify(customer))
    } else {
        let customers = JSON.parse(localStorage.getItem("customers"));
        customers.push(customer);
        localStorage.setItem("customers", JSON.stringify(customer));
    }
}

export const calculateCustomerId = () => {
    if (localStorage.getItem("customers") == null) {
        return 1;
    } else {
        let customers = JSON.parse(localStorage.getItem("customers"));
        return parseInt(customers[customers.length - 1].id) + 1;
    }
}

export const calculatePoliciesId = () => {
    if (localStorage.getItem("policies") !== null) {
        let policies = JSON.parse(localStorage.getItem("policies"));
        return parseInt(policies[policies.length - 1].id) + 1;
    }
    return null;
}

export const getCustomers = () => {
    if (localStorage.getItem("customers") == null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem("customers"));
    }
}

export const getSpecificPolicy = (policyId) => {
    let policy = getPolicies().find((item) => {
        return item.id == policyId
    })
    return policy.name
}

export const getPolicies = () => {
    initialPoliciesData();
    let policies = JSON.parse(localStorage.getItem("policies"));
    return policies;
}

const initialPoliciesData = () => {
    if (localStorage.getItem("policies") == null) {
        let policies = [
            {
                name: "Ferdi Kaza Sigortası",
                id: 1,
            },
            {
                name: "Trafik Sigortası",
                id: 2,
            },
            {
                name: "Kasko Sigortası",
                id: 3,
            },
            {
                name: "Konut Sigortası",
                id: 4,
            },
            {
                name: "Dask Sigortası",
                id: 5,
            },
            {
                name: "Bireysel Sağlık Sigortası",
                id: 6,
            },
            {
                name: "Tamamlayıcı Sağlık Sigortası",
                id: 7,
            },
            {
                name: "Yurtdışı Seyahat Sigortası",
                id: 8,
            }
        ]
        localStorage.setItem("policies", JSON.stringify(policies));
    }



}



