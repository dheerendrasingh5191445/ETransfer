export const ConfigFile=
{
CsoServiceUrls:{
    CsoAllGet:"http://localhost:56622/api/Cso/GetPendingCsoRequest/",
    CsoApprovedGet:"http://localhost:56622/api/Cso/GetApprovedCsoRequest",
    CsoPut:"http://localhost:56622/api/cso/",   
    CsoAssetDetails:"http://localhost:56622/api/cso/GetAssetDetail/"
},
HrServiceUrls:{
    HrAllGet:"http://localhost:56622/api/HR/",
    HrDiscrepancyReport:"http://localhost:56622/api/HR/GetDiscrepantRequest"
},
AssetControllerServiceUrls:{
    GetAsset:"http://localhost:56622/api/Asset/Get",
    GetDiscrepancy:"http://localhost:56622/api/Asset/GetDiscrepantRequest"
}
}