from django.contrib.auth.decorators import login_required, permission_required
from django.shortcuts import redirect, render
from django.template import TemplateDoesNotExist


from corptools.models import Structure, CorpAsset
from . import models


@login_required
@permission_required('indydash.view_dash')
def react_bootstrap(request):
    return render(request, 'indydash/react_base.html')


@login_required
@permission_required('indydash.view_dash')
def get_structure_list(request):
    inc_groups = [1404, 1406]
    inc_services = ['Material Efficiency Research',
                    'Blueprint Copying',
                    'Time Efficiency Research',
                    'Composite Reactions',
                    'Reprocessing',
                    'Biochemical Reactions',
                    'Hybrid Reactions',
                    'Invention',
                    'Manufacturing (Standard)',
                    'Manufacturing (Capitals)',
                    'Manufacturing (Super Capitals)',
                    ]

    corps = models.IndyDashConfiguration.objects.get(pk=1).corporations.all()
    strs = Structure.objects.filter(structureservice__name__in=inc_services,
                                    structureservice__state="online",
                                    type_name__group_id__in=inc_groups,
                                    corporation__corporation__in=corps).distinct()

    output = []
    for s in strs:
        services = s.structureservice_set.filter(
            name__in=inc_services, state="online")
        r = CorpAsset.objects.filter(location_id=s.structure_id,
                                     location_flag__icontains="rig"
                                     ).values_list('type_name__name', flat=True).distinct()

        output.append({
            "system": s.system_name,
            "name": s.name,
            "type": s.type_name.name,
            "services": services,
            "rigs": list(r)})

    try:
        return render(request, 'indydash/bs5_base.html', context={"structures": output})
    except TemplateDoesNotExist:
        return redirect("indydash:view-bs3")
