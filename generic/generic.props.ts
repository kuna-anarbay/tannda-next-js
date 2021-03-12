import {GenericState} from "./generic.state";

export interface GenericProps<Req, Res> extends GenericState<Res> {
    request: (req: Req, file: File | null) => () => void
}