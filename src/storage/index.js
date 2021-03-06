
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

export const removePolicyFromCustomer = (id, customerid) => {
    let customerpolicies = JSON.parse(localStorage.getItem("customerpolicies"));
    customerpolicies = customerpolicies.filter((item) => {
        return item.policyId !== id && item.customerId == customerid
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

export const updateCustomerPolicyStorage = (customerId, policyId, data) => {
    let customerPolicy = JSON.parse(localStorage.getItem("customerpolicies"));
    let updatedCustomerPolicy = customerPolicy.map((policy) => {
        if (policy.customerId == customerId && policy.policyId == policyId) {
            return {
                customerId,
                policyId,
                ...data
            }
        } else {
            return policy
        }
    })

    localStorage.setItem("customerpolicies", JSON.stringify(updatedCustomerPolicy));

}

export const updateCustomerStorage = (id, data) => {
    let customers = JSON.parse(localStorage.getItem("customers"));
    let updatedData = customers.map((customer) => {
        if (customer.id == id) {
            return {
                id,
                ...data
            }
        } else {
            return customer
        }


    })
    localStorage.setItem("customers", JSON.stringify(updatedData));
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
                name: "Ferdi Kaza Sigortas??",
                id: 1,
            },
            {
                name: "Trafik Sigortas??",
                id: 2,
            },
            {
                name: "Kasko Sigortas??",
                id: 3,
            },
            {
                name: "Konut Sigortas??",
                id: 4,
            },
            {
                name: "Dask Sigortas??",
                id: 5,
            },
            {
                name: "Bireysel Sa??l??k Sigortas??",
                id: 6,
            },
            {
                name: "Tamamlay??c?? Sa??l??k Sigortas??",
                id: 7,
            },
            {
                name: "Yurtd?????? Seyahat Sigortas??",
                id: 8,
            }
        ]
        localStorage.setItem("policies", JSON.stringify(policies));
    }



}



