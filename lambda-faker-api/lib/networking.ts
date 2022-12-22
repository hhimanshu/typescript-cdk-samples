import {Construct} from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {SubnetType} from 'aws-cdk-lib/aws-ec2';

interface NetworkingProps {
    maxAzs: number
}

export class Networking extends Construct {
    public readonly vpc: ec2.IVpc;

    constructor(scope: Construct, id: string, props: NetworkingProps) {
        super(scope, id);

        this.vpc = new ec2.Vpc(this, id, {
            cidr: '10.0.0.0/16',
            maxAzs: props.maxAzs,
            subnetConfiguration: [
                {
                    subnetType: SubnetType.PUBLIC,
                    name: 'Public',
                    cidrMask: 24
                },

                {
                    subnetType: SubnetType.PRIVATE_ISOLATED,
                    name: 'Private',
                    cidrMask: 24
                },
            ],
        })

    }
}
