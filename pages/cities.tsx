import React from "react";
import {useDispatch} from "react-redux";
import {CityAction} from "../store/actions/city.action";
import {Query} from '@redux-requests/react';
import {cityConstants} from "../store/constants/city.constants";

const Spinner = () => <p>loading...</p>;
const RequestError = () => (
    <p>There was some error during fetching. Please try again.</p>
);

export default function CitiesPage() {

    const dispatch = useDispatch();

    const getCities = () => {
        dispatch(CityAction.getCities());
    }

    return (
        <div>
            <button onClick={() => getCities()}>
                Fetch cities
            </button>
            <Query
                type={CityAction.getCities}
                action={CityAction.getCities}
                errorComponent={RequestError}
                loadingComponent={Spinner}
                noDataMessage={<p>There is no entity currently.</p>}
            >
                {({data}) => <div>
                    {data.map(city => (
                        <p>
                            {city.id}
                        </p>
                    ))}
                </div>}
            </Query>
        </div>
    )
}