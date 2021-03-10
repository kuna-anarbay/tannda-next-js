import React from "react";

export const features = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>,
        title: "features:content.title",
        description: "features:content.description"
    },
    {
        icon: <i className="fas fa-bullhorn"/>,
        title: "features:marketing.title",
        description: "features:marketing.description"
    },
    {
        icon: <i className="fas fa-reply-all"/>,
        title: "features:requests.title",
        description: "features:requests.description"
    },
    {
        icon: <i className="fas fa-language"/>,
        title: "features:multilanguage.title",
        description: "features:multilanguage.description"
    },
    {
        icon: <i className="far fa-images"/>,
        title: "features:images.title",
        description: "features:images.description"
    },
    {
        icon: <i className="fas fa-globe-europe"/>,
        title: "features:online.title",
        description: "features:online.description"
    }
]